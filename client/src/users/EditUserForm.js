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
        
        <td colSpan="2">
        <form onSubmit={handleSubmit}>
            <input className="inputUserName" type="text" name="name" onChange={handleChange} value={user.name}/>
            <input className="inputUserEmail" type="text" name="email" onChange={handleChange} value={user.email}/>
            <button type="submit">Submit</button>
        </form>
        </td>
        
    );
}

export default EditUserForm;