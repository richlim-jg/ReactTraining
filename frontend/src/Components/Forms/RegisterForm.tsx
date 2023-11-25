import React, { useState } from "react";
import axios from "../../helpers/axios";
import { Res } from "../../helpers/interfaces";
import "../../CSS/Form.css";

const RegisterForm = ({setHasAccount} : {setHasAccount:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const[password, setPassword] = useState("");
    const[password_confirmation, setPassword_confirmation] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            await axios.post('/register', {name, password, password_confirmation})
            .then(function(response:Res){
                if(!response['data'].hasOwnProperty('errors')){
                    setError("");
                    setName("");
                    setPassword_confirmation("");
                    setHasAccount(true);
                }else{
                    setError("");
                    console.log(response['data'].errors.error);
                    let error = response['data'].errors.error;
                    if(error.hasOwnProperty('password')){
                        setError(error.password);
                    }
                    else if(error.hasOwnProperty('password_confirmation')){
                        setError(error.password_confirmation);
                    }
                    else if(error.hasOwnProperty('name')){
                        setError(error.name);
                    }
                    
                }
            });
            
        } catch(e) {
            console.log("Axios Login Error: ", e);
        }
    }
    
    return (
        <form onSubmit={e => handleSubmit(e)} className="loginForm">
            <div className="formHeader">
                <h1>Register</h1>
            </div>
            <div>
                <div className="row">
                    <span className="error">{error}</span>
                </div>
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                </div>
                <div className="row">
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type="password" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} name="password_confirmation"/>
                </div>
                <a onClick={() => setHasAccount(true)} className="loginA">
                    Already have an account?
                </a>
                <button type="submit" className="loginBtn">Submit</button>
            </div>
            
        </form>
    );
}

export default RegisterForm;