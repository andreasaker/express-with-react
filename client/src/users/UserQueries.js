const getUsers = () => {
    return fetch("http://localhost:9000/users/")
    .then(res => res.json());
}

const createUser = user => {
    return new Promise(resolve => {
        fetch(`http://localhost:9000/users/new/${user.name}-${user.email}`, {method: 'POST'})
        .then(res => resolve(res.json()));
    });
}

const editUser = user => {
    fetch(`http://localhost:9000/users/edit/${user.id}-${user.name}-${user.email}`, {method: 'PUT'})
        .then(res => res.text())
        .then(res => res);
}

const removeUser = userId => {
    fetch(`http://localhost:9000/users/${userId}`, {method: 'DELETE'})
    .then(res => res.text())
    .then(res => console.log(res));
}

module.exports = {
    getUsers,
    createUser,
    editUser,
    removeUser
}