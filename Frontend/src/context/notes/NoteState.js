import NoteContext from './NoteContext'
import { useState } from 'react'

const NoteState = (p) => {
    // const s1 = {
    //     'name': 'harry',
    //     'work': 'railfanning'
    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             'name': 'harry2',
    //             'work': 'railfanning2'
    //         })
    //     }, 1000);
    // }
    const notesInitial = []
    const host = 'http://localhost:3300'
    const [notes, setNotes] = useState(notesInitial)


    // Get all Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setNotes(json)
    }
    // Add a Note
    const addNote = async (title, desc, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                title,
                description: desc,
                tag
            })
        })
        const note = await response.json()
        // V.IMP.: Push updates an array but concat returns an array
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const delNote = async (id) => {
        fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        setNotes(notes.filter((note) => note._id !== id))
    }
    // Edit a Note
    const editNote = async (id, title, desc, tag) => {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                title,
                description: desc,
                tag
            })
        })
        let newNotes = JSON.parse(JSON.stringify(notes))
        newNotes.forEach(elem => {
            if (elem._id === id) {
                elem.title = title
                elem.description = desc
                elem.tag = tag
                return
            }
        });
        setNotes(newNotes)
    }
    return (
        // <NoteContext.Provider value={{state,update}}>
        <NoteContext.Provider value={{ notes, getNotes, addNote, delNote, editNote }}>
            {p.children}
        </NoteContext.Provider>
    )
}

export default NoteState