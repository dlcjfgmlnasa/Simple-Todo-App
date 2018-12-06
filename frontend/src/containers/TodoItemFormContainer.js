import React, {Component} from 'react';
import '../css/Form.css';
import * as service from '../service/CategoryService';

class TodoItemFormContainer extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            categories : [],
            contents : '',
            category : 1
        }
    }
    
    componentDidMount(){
        this.getCategories();
    }

    getCategories = async() => {
        await service.findAll()
                     .then(res => this.setState({categories: res.data}));
       
    }

    handleChange = (ev) => {
        const {name, value} = ev.target;
        
        this.setState({
          [name]: value // input 의 다음 바뀔 값
        });
    
      }

      
      
  handleOnCreate = () => {
    const {onCreate} = this.props;
    
    this.setState({
        category : 1, 
        contents : ''
    })
    onCreate(this.state);
}

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleOnCreate();
    }
  }
    render(){
        const {category, categories, contents} = this.state;
        const {handleChange, handleOnCreate, handleKeyPress} = this;

        return(
            <div className="form">
                <select name="category" defaultValue={category} onChange={handleChange}>
                {
                    categories.map((c, idx) => 
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                  )
                }
                </select>
                <input name="contents" defaultValue={contents} onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div className="create-button" onClick={handleOnCreate}>
                    추가
                </div>
          </div>
        );
    }
}

export default TodoItemFormContainer;