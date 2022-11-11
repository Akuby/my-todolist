import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
function TodoItem(props) {
  const sendDelTitle = () => { // 내 역할은 props의 delTodo에 title을 전해주는 것
    const title = props.title
    props.delTodo(title) // 실제로 지우는건 App.js의 props인 내가 해
  }
  return(
    <div className="flex flex-wrap justify-center my-3">
      <p className="text-transparent bg-clip-text bg-gradient-to-l from-bg01 to-bg02 font-semibold text-lg w-4/5 mb-1">{props.date}</p>
      <li className="w-4/5 list-none shadow shadow-rose-200 rounded-lg bg-gradient-to-l from-bg01 to-bg02 text-white p-3 mb-1 relative flex">
          <input type="checkbox" className='m-2 rounded-full bg-transparent'/>
          <h2 className="ml-2 text-lg font-regular">{props.title}</h2>
          <div className='absolute inset-y-3 right-4'>
          <button className='w-5 m-1 mr-3'>
          <FontAwesomeIcon className='text-lg' icon={faPen} />
          </button>
          <button className='w-5 m-1' onClick={sendDelTitle}>
          <FontAwesomeIcon className='text-lg' icon={faTrashCan} />
          </button>
          </div>
      </li>
    </div>
  )
}
export default TodoItem;