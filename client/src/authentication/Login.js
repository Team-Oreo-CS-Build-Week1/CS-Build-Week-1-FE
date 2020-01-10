import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

export default function Login(props)  {
    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const changeHandler = e => {
        setState({
            ...state, 
            [e.target.name]: e.target.value
        });
    };
 
    const submitHandler = (e, state) => {
        e.preventDefault()
        axios
            .post('https://mud-game-oreo.herokuapp.com/api/login/', state)
                .then(res => {
                 console.log('RESPONSE', res)   
                 localStorage.setItem('token', res.data.key)
                 props.history.push('/');           
            })
            .catch(err => {
                console.log(err)
            })
        setState({           
            username: '',
            password: ''
        })
    }

        return (
            <div className='wrapper'>
                <div className="signup-text">
                    <h1>Sign in to your account</h1>
                </div>
                <form onSubmit={(e) => submitHandler(e, state)}>
                    <div>
                        <label style={{textAlign:'left'}}>Username</label>           
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter Username"
                            value={state.username}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label style={{textAlign:'left'}}>Password</label>  
                        <input 
                            type="password" 
                            name="password" 
                            value={state.password}
                            onChange={changeHandler} 
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <button className="signup-btn"
                    style={(state.email && state.password)? {backgroundColor: "#0D5814"}:{backgroundColor: "#85a688"}}>
                    Submit</button>
                </form>
            </div>
        )
    }