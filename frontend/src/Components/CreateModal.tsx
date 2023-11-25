import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import {User} from "../helpers/interfaces";
import "../CSS/ModalForm.css";

const ModalForm = ({userCreds} : {userCreds : User}) => {
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);

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
            axios.post('/expenses', {'user_id':userCreds['id'], title, amount})
            .then(function(){
                if(title != ""){
                    setError("");
                    setTitle("");
                    setAmount(0);
                    toggleModal();
                    window.location.reload();
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
            <button onClick={toggleModal} className="navBtn">
                Add Expense
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <div className="modalForm">
                            <div className="modalHeader">
                                <h1>Expense</h1>
                                <h1>Form</h1>
                            </div>
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="row">
                                    <span className="error">{error}</span>
                                </div>
                                <div className="row">
                                    <label htmlFor="titleInput">Title</label>
                                    <input type="text" name="titleInput" value={title} onChange={e => setTitle(e.target.value)}/>
                                </div>
                                <div className="row">
                                    <label htmlFor="amountInput">Amount</label>
                                    <input type="number" name="amountInput" value={amount} onChange={e => setAmount(Number(e.target.value))}/>
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