import * as Immutable from "immutable"
import assign = require("object-assign")
import { SessionState } from "./SessionState"

class ApplicationStateProps {
    todos?: Immutable.List<string>;
    session?: SessionState;
}

export class ApplicationState extends ApplicationStateProps {
    private constructor(props: ApplicationStateProps) {
        super();
        Object.keys(props).forEach(key => (this as any)[key] = (props as any)[key]);
    }
    
    static create(): ApplicationState {
        return new ApplicationState({
            todos: Immutable.List.of<string>("ad", "fewfew"),
            session: SessionState.create(),
        });
    }

    overwrite(props: ApplicationStateProps) {
        return new ApplicationState(assign({}, this, props));
    }
}
