import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import '../css/common.css'
import axios from 'axios'
function TodoItem(props) {
  
  const {id, name, due_date, sub_date, is_done, is_continued} = props.todoList
  const [isEditing, setIsEditing] = useState(false)
  const [taskDone, setTaskDone] = useState(
    is_done === 0 ? false : true
    )

  const sendDelTitle = () => {
    const name = props.name
    props.delTodo(name)
  }
  const editMode = () => {
    setIsEditing(!isEditing)
  }
    if (isEditing === true) {
      return(
        <div className="flex flex-wrap justify-center my-3">
          <p className="text-transparent bg-clip-text bg-gradient-to-l from-bg01 to-bg02 font-semibold text-lg w-4/5 mb-1">{props.date}</p>
          <li className="w-4/5 list-none shadow shadow-rose-200 rounded-lg bg-gradient-to-l from-bg01 to-bg02 text-white p-3 mb-1 relative flex" >
              <input className='bg-transparent' type="text" defaultValue={props.todoList.name}></input>
              <div className='absolute inset-y-2 right-4'>
              <button className='w-5 m-1 mr-3' onClick={editMode}>
              <FontAwesomeIcon icon={faPen} />
              </button>
              <button className='w-5 m-1' onClick={sendDelTitle}>
              <FontAwesomeIcon icon={faTrashCan} />
              </button>
              </div>
          </li>
        </div>
      ) 
    } else if (isEditing === false) {
      return(
        <div className="flex flex-wrap justify-center my-3">
          <p className="text-transparent bg-clip-text bg-gradient-to-l from-bg01 to-bg02 font-semibold text-lg w-4/5 mb-1">{sub_date.match(/\d{4}-\d{2}-\d{2}/)[0]}</p>
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
              <h2 className="font-regular">{name}</h2>
              </label>
              <p className='text-sm ml-2'>{'~'+due_date.match(/\d{4}-\d{2}-\d{2}/)[0]}</p>
              <div className='absolute inset-y-2 right-4'>
              <button className={taskDone ? "hidden" : "w-5 m-1 mr-3"} onClick={editMode}>
              <FontAwesomeIcon icon={faPen} />
              </button>
              <button className='w-5 m-1' onClick={sendDelTitle}>
              <FontAwesomeIcon icon={faTrashCan} />
              </button>
              </div>
          </li>
        </div>
      )  
  }
}
export default TodoItem;