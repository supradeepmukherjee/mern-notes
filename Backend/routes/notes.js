const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

// Get all the notes
router.get('/getallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error')
    }
})


// Add a new note
router.post('/addnote', fetchUser, [
    body('title', 'Title must of atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must of atleast 6 characters').isLength({ mi: 6 })
], async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, description, tag } = req.body
    try {
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error')
    }
})

// Update an existing note
router.patch('/updatenote/:id', fetchUser,
    // [
    //     body('title', 'Title must of atleast 3 characters').isLength({ min: 3 }),
    //     body('description', 'Description must of atleast 6 characters').isLength({ mi: 6 })
    // ],
    async (req, res) => {
        // if there are errors, return bad request and the errors
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }
        const { title, description, tag } = req.body
        // Create a newNote object
        try {
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            // Find the note to be updated and update it
            let note = await Notes.findById(req.params.id)
            if (!note) return res.status(404).send('note not found')
            
            if (note.user.toString() !== req.user.id) return res.status(401).send('Not Allowed')
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            )
            res.json(note)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('internal server error')
        }
    })

// Delete an existing note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it

        let note = await Notes.findById(req.params.id)
        if (!note) return res.status(404).send('note not found')
        if (note.user.toString() !== req.user.id) return res.status(401).send('Not Allowed')
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json('note deleted')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error')
    }
})

module.exports = router