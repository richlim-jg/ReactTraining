import { useState } from "react";
import axios from "../helpers/axios";
import { UserCardProps } from "../helpers/interfaces";

const UserCard = ({userCreds, id, name, isAdmin}:UserCardProps) => {
    const [classname, setClassname] = useState(isAdmin ? "card approved" : "card");
    const [approvedLocal, setApprovedLocal] = useState(isAdmin);

    function toggleAdmin(){
        try{
            axios.post('/user/'+id, {'user_id':userCreds['id']}).
            then(function(){
                    const app = approvedLocal ? false : true;
                    setApprovedLocal(app);
                    setClassname(app ? "card approved" : "card");
                });
        }catch(e){
            console.log("Axios Expense Approval Error", e);
        }
    }

    return(
        <>
            <div className={classname}>
                <h3 className="cardTitle">{name}</h3>
                <div className="cardData">
                    <h4>ID: {id}</h4>
                    <h4>Administrator: {approvedLocal ? "Yes" : "No"}</h4>
                </div>
                <div className="cardButtons">
                  {
                    userCreds['isAdmin'] && (
                        <div className="cardBtn">
                        {
                            approvedLocal ? 
                            <button className="declineBtn" onClick={toggleAdmin}>Remove Admin</button>
                            :
                            <button className="acceptBtn" onClick={toggleAdmin}>Make Admin</button>
                        }
                        </div>
                    )
                }  
                </div>
                
            </div>
        </>
        
    );
}

export default UserCard;