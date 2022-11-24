import './App.css';
import kadvice from "kadvice";
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import TodoItemInput from './components/TodoItemInput';
import TodoItemList from './components/TodoItemList.jsx';

function App() {
  
  
  useEffect(() => {
    setDailyAdvice(kadvice.daily(2))
    firstDataLoading()
  }, [])
  
  const [dailyAdvice, setDailyAdvice] = useState(null);
  const [todoList, setTodoList] = useState([])

  const firstDataLoading = async() => {
    const result = await axios.get('/todo');
    setTodoList(result.data)    
  }

  const addTodo = (newInput) => { 
    // const newDate = new Date()
    const newId = Date.now()
    const todoArr = [{
      id: newId,
      name: newInput,
      sub_date: format(new Date(), "YYYY-MM-DD"), 
      // due_date, is_continued 옵션도 입력값 받아야함
    }]
    console.log(todoArr)
    // const concatList = todoArr.concat(todoList)
    // setTodoList(concatList)
  }
  
  // const delTodo = (delTarget) => {
  //   const filteredList = todoList.filter(
  //     (data) => (data.title !== delTarget)
  //   )
  //   setTodoList(filteredList)
  // }


  return(
    <div id='App' className='font-sans pt-20'>
      <h1 className='text-3xl font-bold w-4/5 mx-auto my-3'>🌠 오늘도 화이팅!</h1>
      <p className='w-4/5 mx-auto'>{dailyAdvice !== null ? `${dailyAdvice.message} - ${dailyAdvice.author}` : '명언 출력 실패'}</p>
      <TodoItemInput addTodo={addTodo}/>
      <TodoItemList todoList={todoList} />
    </div>
  )
}

export default App;
