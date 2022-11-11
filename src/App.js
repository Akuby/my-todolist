import { Component } from 'react';
import './App.css';
import TodoItemInput from './components/TodoItemInput';
import TodoItemList from './components/TodoItemList.jsx';
import {
  format
} from "date-fns";
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todolist: [
        {date: '2022-11-10', title: '공부하기'},
        {date: '2022-10-28', title: '청소하기'},
        {date: '2022-10-01', title: '이력서 수정하기'}
      ]
    }
  }
  addTodo = (newInput) => { 
    const newDate = new Date()
    const todoArr = [{date: format(newDate, "YYYY-MM-DD"), title: newInput}]
    const concatList = todoArr.concat(this.state.todolist)
    this.setState({
      todolist: concatList
    })
  }
  delTodo = (input) => {
    const filteredList = this.state.todolist.filter(
      (data) => (data.title !== input)
    )
    this.setState({
      todolist: filteredList
    })
  }
  render() {
    const {todolist} = this.state
    return(
      <div id='App' className='font-sans '>
        <TodoItemInput addTodo={this.addTodo} />
        <TodoItemList listItem={todolist} delTodo={this.delTodo}/>
      </div>
    )
  }
}

export default App;
