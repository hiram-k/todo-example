import { ActionListener, partialSubscribe } from "../Provider"
import { ApplicationState } from "../states/ApplicationState"
import { reduce as reduceTodos } from "./TodoReducer"
import { reduce as reduceSession } from "./SessionReducer"

export function reduce(subscribe: ActionListener<ApplicationState>): void {
    reduceTodos(partialSubscribe(
        subscribe,
        state => state.todos,
        (parent, partial) => parent.overwrite({todos: partial}),
    ));
    reduceSession(partialSubscribe(
        subscribe,
        state => state.session,
        (parent, partial) => parent.overwrite({session: partial}),
    ));
}
