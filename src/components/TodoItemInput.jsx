import { useState } from "react";

function TodoItemInput (props) {

  const [inputValue, setInputValue] = useState('');
  
  const handleTodoInput = (e) => {
    if (e.key === 'Enter') {
      const newInput = inputValue
      props.addTodo(newInput)
      e.target.value = ''
    }
  }

    return (
      <div className="w-4/5 mx-auto my-8 p-1 rounded-lg bg-gradient-to-r from-bg01 to-bg02">
        <label htmlFor="name" className="sr-only">할 일 입력</label>
        <input className="p-3 w-full rounded-lg focus:outline-none" type="text" id="name" placeholder="할 일을 입력하세요" onChange={(e) => {setInputValue(e.target.value)}} onKeyDown={handleTodoInput} autoComplete='off'/>
      </div>
    )
  
}

export default TodoItemInput;