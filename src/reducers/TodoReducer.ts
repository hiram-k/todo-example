import * as Immutable from "immutable"
import { ActionListener, StateUpdate } from "../Provider"

type TodosState = Immutable.List<string>;

export function reduce(subscribe: ActionListener<TodosState>): void {
    subscribe("item-click", itemClick);
    subscribe("session-establish", establish);
}

function delay(time: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, time));
}

function itemClick(update: StateUpdate<TodosState>, index: number): void {
    delay(1000).then(() => {
        update(prev => prev.update(index, prev => prev + "!"));
        update(prev => delay(500).then(() => Promise.resolve(prev.update(index, prev => prev + "*"))));
        return delay(1000);
    })
    .then(() => {
        update(prev => prev.update(index, prev => prev + "?"));
    });
}

function establish(update: StateUpdate<TodosState>, payload: {userName: string}): void {
    const n = Math.random() * 10000;
    update(prev => prev.push(payload.userName + n));
}
