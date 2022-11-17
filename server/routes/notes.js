const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middlewear/fetchuser');
const { body, validationResult } = require('express-validator');



//ROUTE--1    
// Get all the notes using: Get "/api/notes/getuser" . Does not requore auth , login requires
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id });
            res.json(notes)

        } catch (error) {

            console.log(error.message)
            res.status(500).send("Enternal server Error")

        }
    })


// router.get('/getnews', fetchuser,
//     async (req, res) => {
//         try {

//             const { country, category, page, pageSize , for} = req.body
//             let url 
//             for === heading
//                 url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=db49aa8002b1432097bbf4248dc03ded&page=${page}&pageSize=${pageSize}`
//             else if for === country
//                 url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=db49aa8002b1432097bbf4248dc03ded&page=${this.state.page}&pageSize=${this.props.pageSize}`


//         let data = await fetch(url);


//             let parsedData = await data.json();

//             return parsedData

//         } catch (error) {

//             console.log(error.message)
//             res.status(500).send("Enternal server Error")

//         }
//     })

//ROUTE--2    
// ADD notes using: POST "/api/notes/addnote" . Does not requore auth , login requires
router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 3 }),

    body('description', 'Descroiption must be atlest 5 characters').isLength({ min: 5 }),

],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body
            // if there are errors, return Bad request and the errors

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNotes = await note.save()

            res.json(savedNotes)

        } catch (error) {

            console.log(error.message)
            res.status(500).send("Enternal server Error")
        }
    })

//ROUTE--3    
// Update note using: PUT "/api/notes/updatenote:id" . Does not requore auth , login requires
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {


            const { title, description, tag } = req.body
            //create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //Find the note to be updated and update it .
            let note = await Notes.findById(req.params.id); if (!note) { return res.status(404).send("Not found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (error) {

            console.log(error.message)
            res.status(500).send("Enternal server Error")

        }


    })

//ROUTE--4    
// Delete note using: DELETE "/api/notes/deletenote/id" . , login requires
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {

            //Find the note to be delete and delete it .
            let note = await Notes.findById(req.params.id); if (!note) { return res.status(404).send("Not found") }

            //Allow deletion only if user owns this note.

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: note });
        } catch (error) {

            console.log(error.message)
            res.status(500).send("Enternal server Error")

        }

    })

module.exports = router