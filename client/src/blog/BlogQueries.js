

const getBlogEntries = () => {
    return fetch('http://localhost:9000/blogentries/')
    .then(res => res.json());
}

const createBlogEntry = entry => {
    return fetch(`http://localhost:9000/blogentries/new/${entry.title}-${entry.content}-${entry.img_link}-${entry.user_id}`, {method: 'POST'})
    .then(res => res.json());
}

const deleteBlogEntry = id => {
    return fetch(`http://localhost:9000/blogentries/${id}`, {method: 'DELETE'})
    .then(res => res.text())
    .then(res => console.log(res));
}

module.exports = {
    getBlogEntries,
    createBlogEntry,
    deleteBlogEntry
}