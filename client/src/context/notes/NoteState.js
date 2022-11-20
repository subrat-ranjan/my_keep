import React, { useState } from "react";  //no need to import react
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //GET ALL NOTES
    const getNotes = async () => {

        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });
        // const json = response.json();
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    //ADD A NOTE 
    const addNote = async (title, description, tag) => {
        //todo:Api call

        //API call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))


    }
    //DELETE A NOTE
    const deleteNote = async (id) => {


        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = response.json();
        console.log(json);


        console.log("deleting the note with id " + id)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })


        setNotes(newNotes)
    }
    //EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = response.json();

        //we cant change notes directly .. we have to create a newNote variable ..
        let newNotes = JSON.parse(JSON.stringify(notes))
        //JSON.parse it creates a deaf copy of notes.

        // logic to edit in client 
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;