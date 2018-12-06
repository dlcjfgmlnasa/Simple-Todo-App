import React, { Component } from 'react';
import '../css/TodoItem.css';

class TodoItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }
  
  render() {
    const { contents, category, checked, id, onToggle, onRemove } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${checked && 'checked'}`}>
          <label>{category}</label>
          <div>{contents}</div>
        </div>
        {
          checked && (<div className="check-mark">&#x2713;</div>)
        }
      </div>
    );
  }
}

export default TodoItem;