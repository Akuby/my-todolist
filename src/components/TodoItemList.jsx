import TodoItem from './TodoItem'

function TodoItemList(props) {

  const result = props.todoList.map(
    (data, idx) => ( < TodoItem key={idx} todoList = {data} delTodo = { props.delTodo } />
    )
  )
  return (
    [result]
  )
}
export default TodoItemList;