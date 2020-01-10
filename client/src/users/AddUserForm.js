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
            <h2>Add User</h2>
            <p><label>Name:</label>
            <input type="text" name="name" onChange={handleChange} value={user.name}/>
            </p>
            <p>
            <label>Email:</label>
            <input type="text" name="email" onChange={handleChange} value={user.email}/>
            </p>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddUserForm;