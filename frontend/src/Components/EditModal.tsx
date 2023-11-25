import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import {ExpenseCardProps} from "../helpers/interfaces";
import "../CSS/ModalForm.css";

const ModalForm = ({userCreds, id, title, amount}:ExpenseCardProps) => {
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [formTitle, setTitle] = useState(title);
    const [formAmount, setAmount] = useState(amount);

    useEffect(() => {
        if(modal) {
            document.body.classList.add('active-modal')
        } else {
            document.body.classList.remove('active-modal')
        }
    }, [modal]);
    
    const toggleModal = () => {
        setModal(!modal);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            axios.post('/expenses/'+id, {'user_id':userCreds['id'], title, amount})
            .then(function(){
                if(formTitle != ""){
                    setError("");
                    setTitle("");
                    setAmount(0);
                    toggleModal();
                }
                else{
                    setError("Title is required");
                }
            })
        }catch(e) {
            console.log("Axios Login Error: ", e);
        }
    }

	return( 
		<>
            <button onClick={toggleModal} className="editBtn">
                Edit
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <div className="modalForm">
                            <div className="modalHeader">
                                <h1>Edit Expense</h1>
                                <h1>Form</h1>
                            </div>
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="row">
                                    <span className="error">{error}</span>
                                </div>
                                <div className="row">
                                    <label htmlFor="titleInput">Title</label>
                                    <input type="text" name="titleInput" value={formTitle} onChange={e => setTitle(e.target.value)}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="amountInput">Amount</label>
                                    <input type="number" name="amountInput" value={formAmount} onChange={e => setAmount(Number(e.target.value))}/>
                                </div>
                                <button className="modalSubmit">Submit</button>
                            </form>
                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            close
                        </button>
                    </div>
                </div>
            )}
        </>
	);
}

export default ModalForm;