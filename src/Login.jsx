import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import './Login.css';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
export default function Login() {

    const [ {} , dispatch] = useStateValue();

    const signIn = () =>{
        auth
        .signInWithPopup(provider)
        .then((result) => { 
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user,
            });
        })
        .catch(error =>alert(error))
    };

    return (
        <div className = "login">
            <div className = "login__container">
                <img src = " https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg " alt = "logo" />
                <div className = "login__text">
                    <h1>Sign In to Whatsapp</h1>
                </div>
                <Button onClick = {signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}
