import * as React from "react"
import { DispatchableComponent } from "../Provider"
import { TodosComponent } from "./TodosComponent"
import { ApplicationState } from "../states/ApplicationState"

export class RootComponent extends DispatchableComponent<ApplicationState, {}> {
    render(): JSX.Element {
        return <div>
            {this.props.session.userName}<button onClick={() => this.dispatch("session-establish", {userName: "hogen"})}>establish</button>
            <TodosComponent todos={this.props.todos} />
        </div>
    }
}
