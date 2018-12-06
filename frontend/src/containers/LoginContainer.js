import React, {Component, Fragment} from 'react';
import Login from '../components/Login';
import {Redirect} from 'react-router-dom';
import {baseURL} from '../service/Settings';

class LoginContainer extends Component{

    state = {
        username : '', 
        password: '',
        isLogined : false
    }

    handleOnChange = (ev) => {
        const {name, value} = ev.target;
        this.setState({
            [name] : value
        })
    }

    handleOnSubmit = (ev) => {
        ev.preventDefault();

        const {username, password} = this.state;

        fetch(`${baseURL}/api-token-auth/`,{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                username , password
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(data => {
            localStorage.setItem('Authorization', `JWT ${data.token}`)
            this.setState({
                isLogined : true
            })
        }).catch(err => {
            console.log(err);
        })

    }

    render(){
        const {handleOnChange, handleOnSubmit} = this;
        const {isLogined} = this.state;
        return(
            <Fragment>
            {isLogined ? 
                <Redirect to='/main'/>
            : <Login
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
              />
            }
        </Fragment>
        );
    }
}

export default LoginContainer;