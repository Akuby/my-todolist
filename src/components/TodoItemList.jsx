import { Component } from "react";
import TodoItem from './TodoItem'
class TodoItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const result = this.props.listItem.map(
      (data, idx) => (
        <TodoItem key={idx} title={data.title} sub={data.sub} dueDate={data.dueDate}/>
      )
    )
    return (
      [result]
    )
  }
}
export default TodoItemList;