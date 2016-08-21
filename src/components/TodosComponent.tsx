import * as React from "react"
import * as Immutable from "immutable"
import { DispatchableComponent } from "../Provider"

class ListItem extends DispatchableComponent<{index: number, name: string, key: string}, {}> {
    render(): JSX.Element {
        return <li onClick={() => this.dispatch("item-click", this.props.index)}>{this.props.name}</li>;
    }
}

export class TodosComponent extends React.Component<{todos: Immutable.List<string>}, {}> {
    render(): JSX.Element {
        return <ul>
            {this.props.todos.map((item, index) => <ListItem key={item} index={index} name={item} />)}
        </ul>
    }
}
