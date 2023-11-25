import "../CSS/Dashboard.css";
import { useState, useEffect} from "react";
import ExpenseCard from "./ExpenseCard";
import UserCard from "./UserCard";
import ModalForm from "./CreateModal";
import "../CSS/Card.css";
import axios from "../helpers/axios";
import {User, Expense, UserArrayObj, ExpArrayObj} from "../helpers/interfaces";

const Dashboard = ({userCreds} : {userCreds : User}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(() => {
        const localValue = localStorage.getItem("PAGE");
        if(localValue == null) return "expenses"
        return JSON.parse(localValue);
    });

    useEffect(() => {
        localStorage.setItem("PAGE", JSON.stringify(page));
    }, [page]);

    useEffect(() => {
        getExpenses();
        if(userCreds['isAdmin']) getUsers();
    }, []);

    function getUsers(){
        try{
            if(userCreds['isAdmin']){
                axios.post('/users/all', {'user_id':userCreds['id'] })
                .then(function(response:UserArrayObj){
                    setUsers(response['data']);
                });
            }
        } catch(e){
            console.log("Axios Expense Error", e);
        }
    }

    function getExpenses(){
        try{
            axios.post('/expenses/all', {'user_id':userCreds['id'] })
            .then(function(response:ExpArrayObj){
                setExpenses(response['data']);
            });
        } catch(e){
            console.log("Axios Expense Error", e);
        }
    }

    function togglePage(){
        setPage((page == "expenses" ? "users" : "expenses"));
    }
    return(
        <div className="mainContainer">
            <nav>
                <div className="navBar">
                    <div className="navTitle">
                        <h1>Expense Report App</h1>
                    </div>
                    <div className="navButtons">
                        <ModalForm userCreds={userCreds} />
                        {
                            userCreds['isAdmin'] ? 
                            <button className="navBtn" onClick={togglePage}>
                                {page == 'expenses' ? 'Users' : 'expenses'}
                            </button>
                            : ""
                        }
                        <button className="logoutBtn"><a href="/">logout</a></button>
                    </div>
                </div>
            </nav>
            <div className="container">
                {
                    page == "expenses" ?
                    expenses.map((expense) => {
                        return (
                        <ExpenseCard 
                            userCreds={userCreds} 
                            id={expense['id']} 
                            title={expense['title']} 
                            amount={expense['amount']} 
                            approved={expense['approved']}
                        />
                        );
                    })
                    :
                    users.map((users) => {
                        return (
                        <UserCard 
                            userCreds={userCreds} 
                            id={users['id']} 
                            name={users['name']} 
                            isAdmin={users['isAdmin']} 
                        />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Dashboard;