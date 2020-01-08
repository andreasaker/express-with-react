import React, {useState, useEffect} from 'react';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import {getUsers} from './UserQueries';

const UserList = () => {
    //Socket.io får bli ett senare projekt
    //let socket = require('socket.io-client')('http://localhost:9000');
    //socket.on('connect', function(){});
    //socket.on('event', function(data){});
    //socket.on('disconnect', function(){});


    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});

    const updateUsers = () => {
      getUsers().then(res => setUsers(res)); // lägg till sockets
    }

    const handleEdit = target => {
        setUser(target);
        setEdit(true);
    }

    useEffect(() => {
        getUsers().then(res => setUsers(res));
    }, []);
    

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
                    <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><button onClick={() => handleEdit(u)}>Edit</button> <button>Delete</button></td>
                    </tr>    
                )}
                </tbody>
            </table>    
            </div>
            <div className="row-2">
                {edit ? (
                 <EditUserForm user={user} updateUsers={updateUsers} setEdit={setEdit}/>
                ) : (
                 <AddUserForm updateUsers={updateUsers}/>
                )}
            </div>
        </div>
        
    );
}


export default UserList;