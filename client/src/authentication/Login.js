import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import styled from "styled-components";
import dragon from "./reddragon.jpg"
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
  body {
    font-family: 'Notable', sans-serif;
  }
`;


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
        <GlobalStyles />
                    </div>
                <form style={{
          textAlign: "center",
          background: "black",
          height: "620px",
          width: "100%",
          height: '100vh'
        }} onSubmit={(e) => submitHandler(e, state)}>
                    <div>
                    <Title> Sign in to your account </Title>
                    <img src={dragon} style={{width: "7.5rem"}} />

<Label> Username </Label>            
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
<Label> Password </Label>                        
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
                    style={( state.email && state.password)? {backgroundColor: "#85a688"}: {color: "red", backgroundColor: "lime", fontWeight: "bold", marginTop: "20px" }}>

                    Submit</button>
<div>
               <Bottom>Don't have an account?</Bottom>
                <div>
                    <Link to="/registration"><Signup>SIGN UP</Signup></Link>
                </div>
            </div>           

                </form>

             </div>
        )
    }


const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: lime;
margin-top: 0px;
padding-top: 50px;
font-family: "Press Start 2P", cursive;
padding-bottom: 60px;
`;
const Label = styled.h1`
font-size: 1em;
text-align: center;
color: white;
padding-top: 10px;
font-family: "Press Start 2P", cursive;
`;
const Bottom = styled.h1`
font-size: .7em;
text-align: center;
color: red;
padding-top: 28px;
font-family: "Press Start 2P", cursive;
`;
const Signup = styled.h1`
font-size: .6em;
text-align: center;
color: red;
padding-top: 5px;
font-family: "Press Start 2P", cursive;
`;

