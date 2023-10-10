const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = ''
// Create a user. No Login required
router.post('/createuser', [
    body('email', 'Please enter a valid Email ID').isEmail(),
    body('name', 'Name must be of atleast 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be of atleast 6 characters').isLength({ min: 6 }),
], async (req, res) => {
    let success = false
    // if there are errors, return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password, name } = req.body
    // check whether the user with same email exists already
    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ success, error: "Sorry a user with the same email id already exists" })
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(password, salt)
        user = await User.create({
            name,
            email,
            password: securedPassword,
        })
        const data = { user: { id: user.id } }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData)
        success = true
        res.json({ success, authToken })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error')
    }
})

// Authenticate a User. No Login required
router.post('/login', [
    body('email', 'Please enter a valid Email ID').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false
    // if there are errors, return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            // return res.status(400).json({ error: "No user with the email exists" })
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const data = { user: { id: user.id } }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})

// Get logged in user details. Login required
router.post('/getuser', fetchUser, async (req, res) => {
    let success = false
    try {
        const userID = req.user.id
        const user = await User.findById(userID).select('-password')
        success = true
        res.json({ success, user })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router