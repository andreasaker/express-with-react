import React,{useState, useEffect} from 'react';
import {editUser} from './UserQueries';

const EditUserForm = props => {
    
    const[user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user);
    },[props.user]);


    let handleChange = e =>{
        const{name, value} = e.target;
        setUser({...user, [name]: value});
    }

    let handleSubmit = e =>{
        editUser(user);
        props.setEdit(false); 
        props.updateUsers(user); 
        e.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Edit User</h2>
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

export default EditUserForm;