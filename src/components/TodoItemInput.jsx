import { useState } from "react";
import ko from 'date-fns/locale/ko';
import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../css/common.css"

function TodoItemInput (props) {

  const [inputValue, setInputValue] = useState('');
  
  const handleTodoInput = (e) => {
    if (e.key === 'Enter') {
      const newInput = inputValue
      props.addTodo(newInput)
      e.target.value = ''
    }
  }
  const [dueDate, setDueDate] = useState(new Date());
  const [repeatTil, setRepeatTil] = useState(new Date());
  
  registerLocale('ko', ko);

    return (
      <div className="w-4/5 mx-auto my-8 p-1 rounded-lg bg-bg02 flex flex-wrap">
        <div className="p-1 w-full">
        <label htmlFor="name" className="text-white">할 일 입력</label>
        <input className="p-2 w-full rounded-lg focus:outline-none" type="text" id="name" placeholder="할 일을 입력하세요" onChange={(e) => {setInputValue(e.target.value)}} onKeyDown={handleTodoInput} autoComplete='off'/>
        </div>
        <div className="p-1 inline-block w-1/2 min-w-fit shrink-0">
        <label htmlFor="due_date" className="text-white">기한 입력</label>
        <DatePicker 
        id="due_date"
        className="rounded-lg text-center p-2 text-gray-600"
        dateFormat="yyyy/MM/dd"
        selected={dueDate} 
        autoComplete='off'
        onChange={(date) => setDueDate(date)} />
        </div>
        <div className="p-1 inline-block w-1/2 min-w-fit shrink-0">
        <label htmlFor="is_continued" className="text-white">반복 설정</label>
        <DatePicker 
        id="is_continued"
        className="rounded-lg text-center p-2 text-gray-600"
        dateFormat="yyyy/MM/dd"
        isClearable
        placeholderText="반복 없음"
        selected={repeatTil} 
        autoComplete='off'
        onChange={(date) => setRepeatTil(date)} />
        </div>
      </div>
    )
  
}

export default TodoItemInput;