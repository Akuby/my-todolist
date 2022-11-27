import './App.css';
import kadvice from "kadvice";
import axios from 'axios'; 
import { useEffect, useState } from 'react';

import TodoItemInput from './components/TodoItemInput';
import TodoItemList from './components/TodoItemList.jsx';

function App() {
  
  
  useEffect(() => {
    setDailyAdvice(kadvice.daily(2))
    dataLoading()
  }, [])
  
  const [dailyAdvice, setDailyAdvice] = useState(null);
  const [todoList, setTodoList] = useState([])

  const dataLoading = async() => {
    const result = await axios.get('/todo');
    setTodoList(result.data)    
  }

  const addTodo = async(todoArr) => {
    await axios.post('/todo', todoArr)
    setTodoList(todoList.unshift(todoArr))
  }
  
  const delTodo = async(delTarget) => {
    const filteredList = todoList.filter(
      (data) => (data.id !== delTarget)
      )
      setTodoList(filteredList)
      await axios.delete('/todo/'+delTarget);
    }


  return(
    <div id='App' className='font-sans pt-20'>
      <h1 className='text-3xl font-bold w-4/5 mx-auto my-3'>🌠 오늘도 화이팅!</h1>
      <p className='w-4/5 mx-auto'>{dailyAdvice !== null ? `${dailyAdvice.message} - ${dailyAdvice.author}` : '명언 출력 실패'}</p>
      <TodoItemInput todoList={todoList} addTodoList={addTodo} dataLoading={dataLoading}/>
      <TodoItemList todoList={todoList} delTodo={delTodo}/>
    </div>
  )
}

export default App;
