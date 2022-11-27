import { useState, useRef } from "react";
import { format } from "date-fns";
import ko from 'date-fns/locale/ko';
import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../css/common.css"
import axios from "axios";

function TodoItemInput (props) {
  
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [repeatTil, setRepeatTil] = useState([]);
  
  const inputRef = useRef();

  // 할일 제목 설정
  const handleTodoInput = (e) => {
    // 엔터키 누를 시 기본 설정으로 할일 목록에 추가
    if (e.key === 'Enter') {
      const newInput = inputValue
      props.addTodo(newInput, dueDate, repeatTil)
      e.target.value = ''
    }
  }

  // 요일 설정
  const handleRepeatTil = (e) => {
    // 클래스 추가로 스타일 변경
    e.target.classList.toggle('bg-white')
    e.target.classList.toggle('bg-rose-400')
    e.target.classList.toggle('text-white')
    // repeatTil 배열에 반복될 요일 배열로 저장
    const dayOfWeek = e.target.innerHTML
      repeatTil.indexOf(dayOfWeek) > -1 ? setRepeatTil(repeatTil.filter((data) => data!==dayOfWeek)) : setRepeatTil([...repeatTil, dayOfWeek])
    }

  // 입력한 값 객체로 내보내기
  const addTodo = () => { 
    if (inputValue.trim() === '') {
      alert('할 일을 입력하세요')
      inputRef.current.focus()
    } else {
      const newId = Date.now()
      const todoArr = [{
        id: newId,
        name: inputValue,
        sub_date: format(new Date(), "YYYY-MM-DD"),
        due_date: format(dueDate, "YYYY-MM-DD"),
        is_continued: repeatTil
      }]
      props.addTodoList(todoArr)
    }
  }
  
  registerLocale('ko', ko);

    return (
      <div className="w-4/5 mx-auto my-8 p-1 rounded-lg bg-bg02 flex flex-wrap p-2">
        <div className="p-1 w-full">
        <label htmlFor="name" className="text-white">할 일 입력</label>
        <input 
        ref={inputRef}
        className="p-2 w-full rounded-lg focus:outline-none" 
        type="text" 
        id="name" 
        placeholder="할 일을 입력하세요" 
        onChange={(e) => {setInputValue(e.target.value)}} 
        onKeyDown={handleTodoInput} 
        autoComplete='off'/>
        </div>
        <div className="p-1 inline-block w-1/2 min-w-fit ">
        <label htmlFor="due_date" className="text-white">기한 입력</label>
        <DatePicker 
        id="due_date"
        className="rounded-lg text-center p-2 text-gray-600 w-full focus:outline-none"
        dateFormat="yyyy/MM/dd"
        selected={dueDate} 
        autoComplete='off'
        onChange={(date) => setDueDate(date)} />
        </div>
        <div className="p-1 inline-block w-1/2 min-w-max">
        <label htmlFor="is_continued" className="text-white">반복 설정</label>
        <div className="flex justify-around min-w-full">
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>월</button>
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>화</button>
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>수</button>
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>목</button>
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>금</button>
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>토</button>
          <button className="rounded-lg p-2 px-3 bg-white" onClick={handleRepeatTil}>일</button>
        </div>
        </div>
        <button 
        className="p-2 w-full bg-rose-400 font-semibold rounded-lg mt-5 font-semibold text-white hover:bg-[#e85166]"
        onClick={() => addTodo()}
        >등록하기</button>
      </div>
    )
  
}

export default TodoItemInput;