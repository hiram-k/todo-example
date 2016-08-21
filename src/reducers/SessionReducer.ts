import { ActionListener, StateUpdate } from "../Provider"
import { SessionState } from "../states/SessionState"

export function reduce(subscribe: ActionListener<SessionState>): void {
    subscribe("session-establish", establish);
}

function establish(update: StateUpdate<SessionState>, payload: {userName: string}): void {
    update(prev => prev.establish(payload.userName, "benri-token"));
}
