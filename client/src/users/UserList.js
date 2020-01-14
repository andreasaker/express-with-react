import React, {useState, useEffect} from 'react';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import {getUsers, removeUser} from './UserQueries';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({id: null});

    const addUser = newUser => {
        setUsers([...users, newUser]);
    }

    const updateUsers = updatedUser => {
      let newUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
      setUsers(newUsers);
    }

    const handleEditUser = target => {
        setUser(target);
        setEdit(true);
        console.log("Editing")
    }

    const handleRemove = targetId => {
        removeUser(targetId);
        let newUsers = users.filter(u => u.id !== targetId);
        setUsers(newUsers);
    }

    useEffect(() => {
        getUsers().then(res => setUsers(res));
    }, []);
    


    const toggleButtons = e => {
        console.log(e.target.parentElement.id);
        let parent = document.getElementById(e.target.parentElement.id)
        let Child = <tr><td>HAJ</td><td></td><td></td></tr>;
        //parent.insertAdjacentHTML('afterend', "" );
        //eBtn.disabled = !eBtn.disabled;
    }

    return(
        <div className="userList">
            <div className="row-1">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {users.map(u => 
                    user.id === u.id && edit ? (
                        <tr key={u.id}>
                            <EditUserForm user={user} updateUsers={updateUsers} setEdit={setEdit} handleRemove={handleRemove} />
                            <td><button className="delBtn"  onClick={() => { handleRemove(u.id)}}>Delete</button></td>
                        </tr>
                    ):(
                    <tr key={u.id} id={`user-row-${u.id}`} >
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><button className="editBtn" onClick={() => handleEditUser(u)}>Edit</button> </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>    
            </div>
            <div className="row-2">
                 <AddUserForm addUser={addUser} />
            </div>
        </div>
        
    );
}


export default UserList;