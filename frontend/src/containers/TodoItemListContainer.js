import React, { Component } from 'react';
import TodoListTemplate from '../components/TodoListTemplate';
import TodoItemList from '../components/TodoItemList';
import TodoItemFormContainer from './TodoItemFormContainer';
import * as service from '../service/TodoService';



class TodoListContainer extends Component {

  state = {
    todos: []
  }

  componentDidMount(){
    this.getTodoList();
  }


  getTodoList =  async() => {
    await service.findAll().then(res => this.setState({todos : res.data}));
  }

  handleCreate = async(todo) => {
    
    await service.insert(todo);
    return this.getTodoList();
    
    //const { todos } = this.state;

    /*this.setState({

      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        category : category,
        checked: false
      })
    });*/
  }


  handleToggle = (id) => {
    const { todos } = this.state;
    
    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사
    
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = async(id) => {
    
    await service.remove(id);
    /*const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });*/
    return this.getTodoList();
  }

  render() {
    const { todos } = this.state;
    const {
      handleCreate,
      handleToggle,
      handleRemove
    } = this;


    return (
      <TodoListTemplate form={
                  <TodoItemFormContainer onCreate={handleCreate}/>}>
      {todos.length > 0 &&
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      }
      </TodoListTemplate>
    );
  }
}

export default TodoListContainer;
