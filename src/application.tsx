import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "./Provider"
import { ApplicationState } from "./states/ApplicationState"
import { reduce as reduceRoot } from "./reducers/ApplicationReducer"
import { RootComponent } from "./components/RootComponent"

class Application extends Provider<ApplicationState> {
    constructor() {
        super(ApplicationState.create(), reduceRoot);
    }

    render(): JSX.Element {
        return <RootComponent {...this.rootState} />
    }
}

ReactDOM.render(<Application />, document.getElementById('root-wrapper'));
