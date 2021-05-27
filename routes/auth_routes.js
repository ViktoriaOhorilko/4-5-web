const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../modules/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Minimal length 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try{
        //console.log(req)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong login data!'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: 'Such user already exist!'})
        }

        const hashedPassword = await bcrypt.hash(password, 78)
        const user = new User({ email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User successfully created!'})

    } catch (e) {
        res.status(500).json({message: 'Sth went wrong...'})
    }
})


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (req, res) => {
    try{

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong register data!'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email: email})

        if (!user) {
            return res.status(400).json({message: 'Such user not found!'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Wrong password!'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '2h'}
        )

        res.json({token, userId: user.id })

    } catch (e) {
        res.status(500).json({message: 'Sth went wrong...'})
    }
})


module.exports = router
