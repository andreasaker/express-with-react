import React,{useState} from 'react';
import {createUser} from './UserQueries';

const AddUserForm = props => {
    const initUser = {id: null, name: "", email: ""}
    const[user, setUser] = useState(initUser);

    let handleChange = e =>{
        const{name, value} = e.target;
        setUser({...user, [name]: value});
    }

    let handleSubmit = e =>{
        createUser(user).then(res=> setUser({...user, id: res.id}));
        props.addUser(user);
        setUser(initUser);
        e.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <input className="inputUserName" type="text" name="name" onChange={handleChange} value={user.name} placeholder="Name"/>
            <input className="inputUserEmail" type="text" name="email" onChange={handleChange} value={user.email} placeholder="Email"/>
            <button type="submit">Create new user</button>
        </form>
    );
}

export default AddUserForm;