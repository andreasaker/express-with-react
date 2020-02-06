import React, {useState, useEffect} from 'react';
import { getBlogEntries, deleteBlogEntry } from './BlogQueries';
import AddBlogEntryForm from './AddBlogEntryForm';

const BlogEntries = () => {

    let [blogEntries, setBlogEntries] = useState([]);
    
    const addNewEntry = entry => {
        setBlogEntries([...blogEntries, entry]);
    }

    const handleRemove = target => {
        if(window.confirm(`Are you sure you want to remove: ${target.title}`)){
            deleteBlogEntry(target.id);
            let updatedEntries = blogEntries.filter(e => e.id !== target.id);
            setBlogEntries(updatedEntries);
        }
    }

    
    useEffect(()=>{
        getBlogEntries().then(res => setBlogEntries(res));
    },[]);


    return(
        <div className="blogContent">
            <div className="blogentryform">
            <AddBlogEntryForm addNewEntry={addNewEntry} />
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
                    </div> 
                    </div>
                )
        }
            
            </div>
        </div>
    );
}

export default BlogEntries;