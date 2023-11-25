import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import { Res, User } from "../../helpers/interfaces";
import "../../CSS/Form.css";
import { useState } from "react";

const LoginForm = ({setHasAccount, setUserCreds}: {setHasAccount:React.Dispatch<React.SetStateAction<boolean>>, setUserCreds:React.Dispatch<React.SetStateAction<User>>}) => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            axios.post('/login', {name, password})
            .then(function(response:Res){
                if(!response['data'].hasOwnProperty('errors')){
                    setError("");
                    setUserCreds(response['data'].user);
                    navigate("/dashboard");
                }else{
                    setError(response['data'].errors);
                }
            });
        } catch(e) {
            console.log("Axios Login Error: ", e);
        }
    }
    
    return(
        <form onSubmit={e => handleSubmit(e)} className="loginForm">
            <div className="row">
                <h1 className="formHeader">LOGIN</h1>
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
                    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                </div>
                <a onClick={() => setHasAccount(false)} className="loginA">
                    Don't have an account?
                </a>
                <button type="submit" className="loginBtn">Login</button>
            </div>
        </form>
    );
}
export default LoginForm;