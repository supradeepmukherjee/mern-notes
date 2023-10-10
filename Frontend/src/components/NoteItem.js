import { useContext } from "react"
import NoteContext from "../context/notes/NoteContext"

const NoteItem = (p) => {
    const { title, description } = p.note
    const { delNote } = useContext(NoteContext)
    const { note, updateNote } = p
    return (
        <div className="col-md-3">
            <div className="card" style={{ width: '18rem' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{title}</h5>
                        <i onClick={() => { delNote(note._id); p.showAlert('Note Deleted', 'success'); }} className="far fa-trash-alt mx-3"></i>
                        <i className="far fa-edit" onClick={() => updateNote(note)}></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem