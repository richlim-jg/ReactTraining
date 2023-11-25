import { useState } from "react";
import axios from "../helpers/axios";
import { ExpenseCardProps} from "../helpers/interfaces";
import editIcon from "../Icons/editIcon.png";
import declineIcon from "../Icons/declineIcon.png";
import approveIcon from "../Icons/approveIcon.png";
import deleteIcon from "../Icons/deleteIcon.png";


const ExpenseCard = ({userCreds, id, title, amount, approved}:ExpenseCardProps) => {
    const [classname, setClassname] = useState(approved ? "card approved" : "card");
    const [approvedLocal, setApprovedLocal] = useState(approved);
    const [cardMode, setCardMode] = useState(0);
    const [formTitle, setFormTitle] = useState(title);
    const [formAmount, setFormAmount] = useState(amount);
    const [error, setError] = useState("");

    function approveExpense(){
        try{
            axios.post('/expenses/approve/'+id, {'user_id':userCreds['id']}).
            then(function(){
                    const app = approvedLocal ? false : true;
                    setApprovedLocal(app);
                    setClassname(app ? "card approved" : "card");
                });
        }catch(e){
            console.log("Axios Expense Approval Error", e);
        }
    }

    function deleteExpense(){
        try{
            axios.delete('/expenses/'+id)
            .then(function(){
                window.location.reload();
            });
            
        }catch(e){
            console.log("Axios Expense Approval Error", e);
        }
    }

    function cancelEdit(){
        setFormTitle(title);
        setFormAmount(amount);
        setCardMode(0);

        console.log("smth")
    }

    function submitForm(){
        try{
            axios.post('/expenses/'+id, {'user_id':userCreds['id'], 'title':formTitle, 'amount':formAmount})
            .then(function(){
                if(formTitle != ""){
                    setError("");
                    setCardMode(0);
                }
                else{
                    setError("Title is required");
                }
            })
        }catch(e) {
            console.log("Axios Login Error: ", e);
        }
    }
    // Read Mode
    if(cardMode == 0){
        return(
            <>
                <div className={classname}>
                    <h3 className="cardTitle">{formTitle}</h3>
                    <div className="cardData">
                        <h4>Amount: {formAmount}</h4>
                        <h4>Approved: {approvedLocal ? "Yes" : "No"}</h4>
                    </div>
                    <div className="cardButtons">
                        {
                            !approvedLocal ?
                            <div className="cardBtn">
                                <button className="declineBtn" onClick={() => deleteExpense()}><img src={deleteIcon} className="svgIcon"/></button>
                            </div>
                            : ""
                        }
                        {
                            userCreds['isAdmin'] ? (
                                <div className="cardBtn">
                                    {
                                        (!approvedLocal && userCreds['isAdmin']) ?
                                         <button className="editBtn" onClick={() => setCardMode(1)}><img src={editIcon} className="svgIcon"/></button> : ""
                                    }
                                    
                                {
                                    approvedLocal ? 
                                    <button className="declineBtn" onClick={approveExpense}><img src={declineIcon} className="svgIcon"/></button>
                                    :
                                    <button className="acceptBtn" onClick={approveExpense}><img src={approveIcon} className="svgIcon"/></button>
                                }
                                </div>
                            ) : (
                                !approvedLocal ?
                                <div className="cardBtn">
                                    <button className="editBtn" onClick={() => setCardMode(1)}><img src={editIcon} className="svgIcon"/></button>
                                </div>
                                 : ""
                            )
                        }
                    </div>
                </div>
            </>
            
        );
    }
    //Edit Mode
    else {
        return(
            <>
                <div className={classname}>
                    <h3 className="cardTitle">Edit</h3>
                    <div className="cardData">
                        <span className="error">{error}</span>
                        <div className="row">
                            <label htmlFor="" className="cardLabel">Title</label>
                            <input className="cardInput" value={formTitle} onChange={e => setFormTitle(e.target.value)}/>
                        </div>
                        <div className="row">
                            <label htmlFor="" className="cardLabel">Amount</label>
                            <input className="cardInput" type="number"value={formAmount} onChange={e => setFormAmount(Number(e.target.value))}/>
                        </div>
                    </div>
                    <div className="cardButtons">
                        <div className="cardBtn">
                            <button className="editBtn" onClick={submitForm}>
                                Submit
                            </button>
                            <button className="declineBtn" onClick={cancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                </div>
            </>
            
        );

    }
    
}

export default ExpenseCard;