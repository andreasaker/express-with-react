const getUsers = () => {
    return fetch("http://localhost:9000/users/")
    .then(res => res.json());
}

const createUser = user => {
    fetch(`http://localhost:9000/users/new/${user.name}-${user.email}`, {method: 'POST'})
        .then(res => res.text())
        .then(res => res);
}

const editUser = user => {
    fetch(`http://localhost:9000/users/edit/${user.id}-${user.name}-${user.email}`, {method: 'PUT'})
        .then(res => res.text())
        .then(res => res);
}

module.exports = {
    getUsers,
    createUser,
    editUser
}