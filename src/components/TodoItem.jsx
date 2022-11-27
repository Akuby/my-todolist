import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faSave } from '@fortawesome/free-solid-svg-icons'
import '../css/common.css'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
function TodoItem(props) {
  
  const {id, name, due_date, sub_date, is_done, is_continued} = props.todoList
  const [myName, setMyName] = useState(name);
  const [myDueDate, SetMyDueDate] = useState(format(due_date, 'YYYY-MM-DD'));
  const [myIsContinued, setMyIsContinued] = useState(is_continued);
  const [isEditing, setIsEditing] = useState(false)
  const [taskDone, setTaskDone] = useState( is_done === 0 ? false : true )

  const sendDelTarget = () => {
    const targetID = props.todoList.id
    props.delTodo(targetID)
  }
  const editMode = () => {
    setIsEditing(!isEditing)
    if (isEditing === true) {
      props.modTodo(id, myName, myDueDate)
    }
    // const dayArr = props.todoList.is_continued;
    // 어떻게 하지
  }
    if (isEditing === true) {
      return(
        <div className="flex flex-wrap justify-center my-3">
          <p className={`text-lg w-4/5 mb-1 ${taskDone ? "text-gray-300" : "font-semibold text-transparent bg-clip-text bg-gradient-to-l from-bg01 to-bg02"}`}>{sub_date.match(/\d{4}-\d{2}-\d{2}/)[0]}</p>
          <li className="w-4/5 list-none shadow shadow-rose-200 rounded-lg bg-gradient-to-r from-bg01 to-bg02 text-white p-3 mb-1 relative flex onEditing" >
            <div>
              <input className='bg-transparent text-gray-700' type="text" 
              defaultValue={myName}
              onChange={e => setMyName(e.target.value)}
              ></input>
              <DatePicker
              dateFormat="yyyy/MM/dd"
              className="rounded-lg text-center p-2 text-gray-600 w-full focus:outline-none"
              selected={new Date(myDueDate)} 
              onChange={(date) => SetMyDueDate(format(date, "YYYY-MM-DD"))}
              />                
              {/* <div>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700 day-active">월</button>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700">화</button>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700">수</button>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700">목</button>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700">금</button>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700">토</button>
                <button className="rounded-lg p-2 px-3 bg-white text-gray-700">일</button>
              </div> */}
              </div>
              <div className='absolute inset-y-2 right-4'>
              <button className='w-5 m-1 mr-3' onClick={editMode}>
              <FontAwesomeIcon icon={faSave} />
              </button>
              <button className='w-5 m-1' onClick={sendDelTarget}>
              <FontAwesomeIcon icon={faTrashCan} />
              </button>
              </div>
          </li>
        </div>
      ) 
    } else if (isEditing === false) {
      return(
        <div className="flex flex-wrap justify-center my-3">
          <p className={`text-lg w-4/5 mb-1 ${taskDone ? "text-gray-300" : "font-semibold text-transparent bg-clip-text bg-gradient-to-l from-bg01 to-bg02"}`}>{sub_date.match(/\d{4}-\d{2}-\d{2}/)[0]}</p>
          <li className={`w-4/5 list-none rounded-lg text-white p-3 mb-1 relative flex items-center ${taskDone ? "bg-gray-200" : "bg-gradient-to-l from-bg01 to-bg02 shadow shadow-rose-200"}`} >
            <label className='b-contain'>
              <input type="checkbox" className='m-2 rounded-full bg-transparent' onClick={
                ()=>{
                setTaskDone(!taskDone); 
                axios.put('/todo', {
                id: id,
                name: name, 
                is_done: taskDone
                })}
              }
              // is_done이 true인 경우, checked 
              defaultChecked={taskDone ? true : false}
                />
              <div className="b-input"></div>
              <h2 className="font-regular">{myName}</h2>
              </label>
              <p className='text-sm ml-2'>{'~'+myDueDate}</p>
              <p className='text-sm ml-2'>{myIsContinued === "[]" ? '반복없음' : myIsContinued}</p>
              <div className='absolute inset-y-2 right-4'>
              <button className={taskDone ? "hidden" : "w-5 m-1 mr-3"} onClick={editMode}>
              <FontAwesomeIcon icon={faPen} />
              </button>
              <button className='w-5 m-1' onClick={sendDelTarget}>
              <FontAwesomeIcon icon={faTrashCan} />
              </button>
              </div>
          </li>
        </div>
      )  
  }
}
export default TodoItem;