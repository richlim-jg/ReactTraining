export interface User {
    id : number;
    name : string;
    isAdmin : boolean;
}

export interface Expense {
    id : number;
    amount : number;
    title : string;
    approved : boolean;
}

export interface ExpArrayObj{
    data : React.SetStateAction<Expense[]>;
}

export interface UserArrayObj {
    data : React.SetStateAction<User[]>;
}

export interface ExpenseCardProps {
    userCreds : User;
    id : number;
    amount : number;
    title : string;
    approved?: boolean;
    removeSelf?: (id:number) => void; //not in use because of react render issue (?)
}

export interface UserCardProps {
    userCreds : User;
    id : number;
    name : string;
    isAdmin : boolean;

}

export interface Res {
    data :  {
        errors : string | any;
        user : User;
    };
}