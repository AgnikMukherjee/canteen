const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/createuser',
    [
    body('email').isEmail(),
    body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                password: secpassword
            })
            res.json({ success: true })
        }
        catch (err) {
            console.log(err)
            res.json({ success: false })
        }

    })

router.post('/loginuser',
    [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
    ],
    
    async (req, res) => {

        let email = req.body.email

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
           let userdata=  await User.findOne({email})
            if(!userdata){
                return res.status(400).json({ errors: "Invalid Credentials" });
            }
            const passwordcompare = await bcrypt.compare(req.body.password, userdata.password)
            if(!passwordcompare ){ 
                return res.status(400).json({ errors: "Invalid Credentials" });
            }else{
            const data = {
                user: {
                    id: userdata.id
                }
            }
            const authtoken = jwt.sign(data, 'jwtsecret', { expiresIn: '2d' } )
            res.json({ success: true , authtoken})
            }
        }
        catch (err) {
            console.log(err)
            res.json({ success: false })
        }

    })
module.exports = router