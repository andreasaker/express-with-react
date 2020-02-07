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

    const handleCloseEdit = () => {
        setEdit(false);
    }

    const handleRemove = target => {
        if (window.confirm(`Are you sure that you want to remove ${target.name}?`)){
            removeUser(target.id);
            let newUsers = users.filter(u => u.id !== target.id);
            setUsers(newUsers);
        }
        
    }

    useEffect(() => {
        getUsers().then(res => setUsers(res));
    }, []);

    return(
        <div className="userList">
            <div className="row-1">
            <center>Tap row to edit user</center><br/>
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
                            <td> <button className="closeBtn" onClick={() => handleCloseEdit()} >Close</button> </td>
                        </tr>
                    ):(
                    <tr key={u.id} id={`user-row-${u.id}`}>
                        <td className="tdA" onClick={() => handleEditUser(u)}> {u.name} </td>
                        <td className="tdB" onClick={() => handleEditUser(u)}> {u.email} </td>
                        <td className="tdC">
                            {!edit &&
                            <button className="delBtn"  onClick={() => { handleRemove(u)}}>Delete</button>
                            }
                        </td>
                    </tr>
                    )
                )}
                <tr>
                    <td colSpan="3"> <AddUserForm addUser={addUser} /> </td>
                </tr>
                </tbody>
            </table>    
            </div>
        </div>
        
    );
}


export default UserList;