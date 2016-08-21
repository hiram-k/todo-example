import * as React from "react"
import { EventEmitter } from "events"
import PromisedReducer from "promised-reducer"

export type ActionListener<TState> = (action: string, handler: ActionHandler<TState>) => void;
export type StateUpdate<TState> = (updater: (prev: TState) => TState | Promise<TState>) => void;
type ActionHandler<TState> = (updater: StateUpdate<TState>, payload?: any) => void;

export function partialSubscribe<TParent, TPartial>(
    subscribe: ActionListener<TParent>,
    decompose: (parent: TParent) => TPartial,
    compose: (parent: TParent, partial: TPartial) => TParent,
): ActionListener<TPartial> {
    return (action, handler) => subscribe(action, (update, payload) => {
        return handler(partialUpdater => update(prev => {
            const partialUpdated = Promise.resolve(partialUpdater(decompose(prev)));
            return partialUpdated.then(updated => compose(prev, updated));
        }), payload);
    });
}

interface IDispatchableContext {
    dispatch: (action: string, payload?: any) => void;
}

interface IProviderState<TRootState> {
    emitter: EventEmitter;
    state: TRootState;
}

export class DispatchableComponent<P, S> extends React.Component<P, S> {
    context: IDispatchableContext;
    static contextTypes = {
        dispatch: React.PropTypes.func.isRequired,
    };
    dispatch(action: string, payload?: any): void {
        this.context.dispatch(action, payload);
    }
}

export abstract class Provider<TRootState> extends React.Component<{}, IProviderState<TRootState>> {
    private _reducer: PromisedReducer<TRootState>;

    constructor(initialState: TRootState, private _listen: (listener: ActionListener<TRootState>) => void, middlewares?: ((state: TRootState) => TRootState | Promise<TRootState>)[]) {
        super();
        this._reducer = new PromisedReducer(initialState, middlewares);
        this.state = {
            emitter: new EventEmitter(),
            state: this._reducer.state,
        };
    }

    static childContextTypes = {
        dispatch: React.PropTypes.func.isRequired,
    };

    getChildContext(): IDispatchableContext {
        return {
            dispatch: (action: string, payload?: any) => this.dispatch(action, payload)
        };
    }

    componentDidMount(): void {
        this._listen((action, handler) => {
            this.state.emitter.on(action, (payload: any) => {
                handler(prev => this._reducer.update(prev), payload);
            });
        });
        this._reducer.on(":update", () => this.setState(prev => ({
            state: this._reducer.state,
            emitter: prev.emitter,
        })));
    }

    get rootState(): TRootState {
        return this.state.state;
    }

    protected dispatch(action: string, payload?: any): void {
        this.state.emitter.emit(action, payload);
    }
}
