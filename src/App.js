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
    const concatedList = todoArr.concat(todoList)
    setTodoList(concatedList)
    await axios.post('/todo', todoArr)
  }
  
  const delTodo = async(delTarget) => {
    const filteredList = todoList.filter(
      (data) => (data.id !== delTarget)
      )
      setTodoList(filteredList)
      await axios.delete('/todo/'+delTarget);
    }

  const modTodo = async(id, name, dueDate) => {
    console.log(id, name, dueDate)
    await axios.put('/todo-mod/', {id:id, name:name, dueDate:dueDate})
  }

  return(
    <div id='App' className='font-sans pt-20'>
      <h1 className='text-3xl font-bold w-4/5 mx-auto my-3'>π  μ€λλ νμ΄ν!</h1>
      <p className='w-4/5 mx-auto'>{dailyAdvice !== null ? `${dailyAdvice.message} - ${dailyAdvice.author}` : 'λͺμΈ μΆλ ₯ μ€ν¨'}</p>
      <TodoItemInput todoList={todoList} addTodoList={addTodo} dataLoading={dataLoading}/>
      <TodoItemList todoList={todoList} delTodo={delTodo} modTodo={modTodo}/>
    </div>
  )
}

export default App;
