function TodoItem(props) {
  return(
    <li><a href='#'>
      <h2 className="text-2xl font-bold underline">{props.title}</h2>
      <p>{props.sub}</p>
      <p>{props.dueDate}</p>
      </a></li>
  )
}
export default TodoItem;