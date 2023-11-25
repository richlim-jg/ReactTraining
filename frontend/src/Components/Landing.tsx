import { useState} from "react";
import LoginForm from "./Forms/LoginForm";
import RegisterForm from "./Forms/RegisterForm";
import {User} from "../helpers/interfaces"
import "../CSS/Landing.css";

const Landing = ({setUserCreds} : {setUserCreds:React.Dispatch<React.SetStateAction<User>>}) => {
    const [hasAccount, setHasAccount] = useState(true);

    return(
        <>
        <main>
            <section className="titleContainer">
                <div className="title">
                    <h1>Expense</h1>
                    <h1>Report App</h1>
                </div>
            </section>
            <section className="formContainer">
                {hasAccount ? < LoginForm setHasAccount={setHasAccount} setUserCreds={setUserCreds}/> : <RegisterForm setHasAccount={setHasAccount}/>}
            </section>
        </main>
        </>
    );
}

export default Landing;