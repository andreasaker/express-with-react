import React, {useState, useEffect, useReducer} from 'react';
import { getBlogEntries, deleteBlogEntry } from './BlogQueries';
import AddBlogEntryForm from './AddBlogEntryForm';
import EditBlogEntry from './EditBlogEntryForm';

const BlogEntries = () => {

    let [blogEntries, setBlogEntries] = useState([]);
    let [edit, setEdit] = useState(false);
    let [editedEntry, setEditedEntry] = useState({id: null});

    const addNewEntry = entry => {
        setBlogEntries([...blogEntries, entry]);
    }

    const editBlogEntry = updatedEntry => {
        let newEntries = blogEntries.map(e => e.id === updatedEntry.id ? updatedEntry : e)
        setBlogEntries(newEntries);
        setEdit(false);
    }

    const handleRemove = target => {
        if(window.confirm(`Are you sure you want to remove: ${target.title}`)){
            deleteBlogEntry(target.id);
            let updatedEntries = blogEntries.filter(e => e.id !== target.id);
            setBlogEntries(updatedEntries);
        }
    }

    const handleEdit = target => {
        setEditedEntry(target)
        setEdit(true);
    }

    
    useEffect(()=>{
        getBlogEntries().then(res => setBlogEntries(res));
    },[]);


    return(
        <div className="blogContent">
            <div className="blogentryform">
                {edit ? (
                    <EditBlogEntry entry={editedEntry} editBlogEntry={editBlogEntry}/>
                ):(
                    <AddBlogEntryForm addNewEntry={addNewEntry} />
                )}
            
            </div>
            <div className="bloglist">
            { blogEntries.map(entry => 
                
                    <div key={entry.id} className="entries">
                        <div>{entry.img_link}</div>
                        <div>{entry.entry_name}</div>
                        <div>
                            <h2>{entry.title}</h2>
                            {entry.content}
                        </div>
                    <div className="entryOptions">
                        <button className="delBtn" onClick={() => handleRemove(entry)}>Remove</button>
                        <button className="editBtn" onClick={() => handleEdit(entry)}>Edit</button>
                    </div> 
                    </div>
                )
        }
            
            </div>
        </div>
    );
}

export default BlogEntries;