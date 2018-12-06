import React from 'react';
import '../css/Form.css';

const Form = ({value, selected, onChange, onCreate, onKeyPress}) => {
  return (
    <div className="form">
      {/* <select name="category" onChange={}>
        <option value="1"></option>
        <option value="1"></option>
        <option value="1"></option>
      </select> */}
      <select name="category" onChange={onChange}>
          <option value="1" selected={selected == '1'}>일정</option>
          <option value="2" selected={selected == '2'}>게임</option>
          <option value="3" selected={selected == '3'}>음악</option>
          <option value="4" selected={selected == '4'}>독서</option>
          <option value="5" selected={selected == '5'}>운동</option>
      </select>
      <input name="input" value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;