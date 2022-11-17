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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjI5ZjA3OTlkMTZkYWZhYzFhYTA3In0sImlhdCI6MTY2NzQ2MTQ0NH0.osNYuWRP_QTbC0yPfU3CYbGj3crpuAw7YXpPLdOMV4g"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjI5ZjA3OTlkMTZkYWZhYzFhYTA3In0sImlhdCI6MTY2NzQ2MTQ0NH0.osNYuWRP_QTbC0yPfU3CYbGj3crpuAw7YXpPLdOMV4g"
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = response.json();


        const note = {
            "_id": "636753dfc9c361ff4bf46f4a7",
            "user": "636229f0799d16dafac1aa07d",
            "title": title,
            "description": description,
            "tag": tag,
            "Date": "2022-11-06T06:27:43.378Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //DELETE A NOTE
    const deleteNote = async (id) => {


        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjI5ZjA3OTlkMTZkYWZhYzFhYTA3In0sImlhdCI6MTY2NzQ2MTQ0NH0.osNYuWRP_QTbC0yPfU3CYbGj3crpuAw7YXpPLdOMV4g"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjI5ZjA3OTlkMTZkYWZhYzFhYTA3In0sImlhdCI6MTY2NzQ2MTQ0NH0.osNYuWRP_QTbC0yPfU3CYbGj3crpuAw7YXpPLdOMV4g"
            },
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = response.json();

        // logic to edit in client 
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.id = id;
            }

        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;