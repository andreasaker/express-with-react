import React, {useEffect, useState} from 'react';
import { editBlogEntry } from './BlogQueries';
import {getUsers} from '../users/UserQueries';

const EditBlogEntryForm = props => {

    const initEntry = {id: null, entry_name: "", title: "", content: "", img_link: "", user_id: null};
    let [entry, setEntry] = useState(props);
    let [users, setUsers] = useState([]);

    useEffect(()=>{
        getUsers().then(res => setUsers(res)); 
    },[]);
    
    let handleChange = e => {
        let name = e.target.name;
        if( name === "user_id"){
            let entryName = e.target.selectedOptions[0].text
            setEntry({...entry, entry_name: entryName});
        }
        setEntry({...entry, [name]: e.target.value});
    }

    let handleSubmit = e =>{
        editBlogEntry(entry);
        props.editEntry(entry);
        e.preventDefault();
    }

    
    
    return(
        <form onSubmit={handleSubmit}>
                <select name="user_id" onChange={e=>{handleChange(e)}}>
                    <option>- Choose -</option>  
                    {users.map(u =>
                        <option key={u.id} value={u.id}>{u.name}</option>    
                    )}
                </select>
                <input type="text" name="title" placeholder="Title" onChange={e=>{handleChange(e)}} value={entry.title}></input>
                <input type="text" name="content" placeholder="Content" onChange={e=>{handleChange(e)}} value={entry.content}></input>
                <input type="text" name="img_link" placeholder="Image link" onChange={e=>{handleChange(e)}} value={entry.img_link}></input>
                <button type="submit">Create</button>
        </form>
    );
}

export default EditBlogEntryForm;


//Not Done!