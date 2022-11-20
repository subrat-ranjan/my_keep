const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middlewear/fetchuser');


JWT_SECRET = 'subrat  fjshfisnfiuohgfoinds'

//ROUTE---1
// create a User using: POST "/api/auth/createuser" . Does not requore auth no login requires

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atlest 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {

        // cheak whether the user with this email exist already


        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exist " })
        }

        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtdata);

        // res.json(user)
        success = true;
        res.json({ success, authtoken })




        // using async await function so there is no need to use .then
        // .then(user => res.json(user))
        //     .catch(err => {
        //         console.log(err)
        //         res.json({ error: 'Please ener a unique value for email', message: err.message })
        //     })

        // res.send(req.body) or 
        //catch errors
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternal server Error")
    }
})

//ROUTE--2
// Authenticate a User using: POST "/api/auth/login" . Does not requore auth no login requires
router.post('/login', [
    body('email', 'Enter a valid email ').isEmail(),
    body('password', 'Password can not be blank')
        .exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })


    } catch (error) {

        console.log(error.message)
        res.status(500).send("Enternal server Error")
    }

})

//ROUTE--3
// Get loggedin user detail using: POST "/api/auth/getuser" . Does not requore auth , login requires


router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")  //select all the field except the password .
        res.send(user);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternal server Error")
    }


})

module.exports = router