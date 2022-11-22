import './App.css';
import { useEffect, useState } from 'react';
import TodoItemInput from './components/TodoItemInput';
import TodoItemList from './components/TodoItemList.jsx';
import {
  format
} from "date-fns";
import axios from 'axios'; 

function App() {

  useEffect(() => {
    firstDataLoading()
  }, [])
  
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
    <div id='App' className='font-sans '>
      {/* <button onClick={selectAll}>눌러</button> */}
      <TodoItemInput addTodo={addTodo}/>
      <TodoItemList todoList={todoList} />
    </div>
  )
}

export default App;
