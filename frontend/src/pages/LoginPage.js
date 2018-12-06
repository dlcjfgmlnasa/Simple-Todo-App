import React, {Component} from 'react';
import LoginContainer from '../containers/LoginContainer';

class LoginPage extends Component{
    
    /*
    //토큰의 로그인 만료시간을 decoding해서 만료이전이면 바로 /main 이동시킬 수 있다.
    componentDidMount(){
        this.props.history.replace('./main')
    }*/


    render(){
        return (
            <LoginContainer/>            
        );
    }
}

export default LoginPage;