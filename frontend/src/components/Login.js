import React from 'react';
import '../css/Login.css';

const Login = ({handleOnSubmit, handleOnChange}) => (
    
    <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={handleOnSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={handleOnChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={handleOnChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
)

export default Login;