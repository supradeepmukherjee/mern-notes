import { useContext, useRef, useState, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import { useNavigate } from "react-router-dom"
import NoteItem from './NoteItem'

const Notes = (p) => {
    const navigate = useNavigate()
    const { notes, editNote, getNotes } = useContext(NoteContext)
    const updateNote = (currNote) => {
        ref.current.click()
        setNote({ id: currNote._id, etitle: currNote.title, edesc: currNote.description, etag: currNote.tag })
    }


    useEffect(() => {
        if (localStorage.getItem('token')) getNotes()
        else navigate('/login')
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: '', etag: 'default', etitle: '', edesc: '' })
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edesc, note.etag)
        refClose.current.click()
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={p.showAlert} />
            {/* Button trigger modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} hidden>
                Launch demo modal
            </button>

            {/*  Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesc" className="form-label">Desc</label>
                                    <input type="text" value={note.edesc} className="form-control" id="edesc" name="edesc" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
                            <button disabled={note.etitle.length < 3 || note.edesc.length < 6} type="button" className="btn btn-primary" onClick={() => { handleClick(); p.showAlert('Note Edited', 'success') }}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                {notes.length !== 0
                    ?
                    <h1>
                        Your Notes
                    </h1>
                    :
                    <h3>
                        No Notes to display
                    </h3>
                }
                {
                    notes.map((note) => {
                        return <NoteItem showAlert={p.showAlert} key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes