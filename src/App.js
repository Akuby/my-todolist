import { Component } from 'react';
import './App.css';
import TodoItemList from './components/TodoItemList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todolist: [
        {title: '공부하기', sub: '리액트 공부하기', dueDate: '2022-12-02'},
        {title: '청소하기', sub: '펜트리 청소하기', dueDate: '2022-11-11'},
        {title: '이력서 수정하기', sub: '이력서 내 훈련내역 추가하기', dueDate: '2022-11-28'}
      ]
    }
  }
  
  render() {
    const {todolist} = this.state
    return(
      <div id='App' className='font-sans'>
        <TodoItemList listItem={todolist}/>
      </div>
    )
  }
}

export default App;
