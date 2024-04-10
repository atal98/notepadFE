import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {ReactComponent as Arrowleft} from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const NotePage = () => {
    const { id } = useParams();
    const params = id;
    const [note, setNote] = useState(null)

    useEffect(() => {
        const getNote = async () => {
            if (params === 'new') return

            let response = await fetch(`/api/notes/${params}`)
            let data = await response.json()
            setNote(data)
        }

        getNote(); // Call getNote inside the useEffect callback
    }, [params])

    let createNote = async() => {
        fetch(`/api/notes/` ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async() => {
        fetch(`/api/notes/${params}/` ,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async() => {
        fetch(`/api/notes/${params}/` ,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    let handleSubmit = () =>{
        if( params !== 'new' && !note.body){
            deleteNote()
        } else if (params !== 'new'){
            updateNote() 
        } else if (params === 'new' && note !==null){
            createNote()
        }
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link  to='/'>
                        <Arrowleft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {params !== 'new' ? (
                    <Link to='/'>
                        <button onClick={deleteNote}>Delete</button>
                    </Link>
                ):(
                    <Link to='/'>
                        <button onClick={handleSubmit}>Done</button>
                    </Link>
                )}
                
            </div>
            <textarea onChange={(e) => {setNote({...note,'body': e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    );
};

export default NotePage;

