import { useContext, useState } from "react"
import NoteContext from "../context/notes/NoteContext"

const AddNote = (p) => {
    const { addNote } = useContext(NoteContext)
    const [note, setNote] = useState({ tag: '', title: '', desc: '' })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.desc, note.tag)
        setNote({ tag: '', title: '', desc: '' })
        p.showAlert('Note added','success')
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1>
                Add a Note
            </h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Desc</label>
                    <input value={note.desc} type="text" className="form-control" id="desc" name="desc" onChange={onChange} minLength={6} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length < 3 || note.desc.length < 6} type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddNote