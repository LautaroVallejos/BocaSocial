const {
    Router
} = require('express')
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

router.get('/', async (req, res, next) => {
    res.json({
        "hola":"hola"
    });
})

router.post('/signup', async (req, res, next) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const user = new User({
            username,
            email,
            password
        })
        user.password = await user.encryptPassword(user.password);
        await user.save();

        const token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.json({
            auth: true,
            token: token
        });
    } catch (e) {
        console.log(e);
        res.status(401).json({
            auth: false,
            message: 'general error',
            error: true
        })
    }
})

router.post('/signin', async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(401).json({
                auth: false,
                token: null
            })
        }
        
        const passwordIsValid = await user.validatePassword(password);

        if (!passwordIsValid) {
            return res.status(401).json({
                auth: false,
                token: null
            })
        }

        const token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        res.writeHead(200, {
            'x-access-token': token
        })
        res.end(JSON.stringify({
            auth:true,
            error:false
        }));
    } catch (e) {
        console.log(e)
        res.json({
            auth: false,
            message: 'general error',
            error: true
        })
    }
})

router.get('/me', async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'no token provided',
                error: true
            })
        }

        const decoded = jwt.verify(token, config.secret);

        const user = await User.findById(decoded.id, {
            password: 0
        });
        if (!user) {
            return res.status(404).send('no user found')
        }
        res.json(user);
    } catch (e) {
        res.status(401).json({
            auth: false,
            message: 'general error',
            error: true
        })
    }
})

module.exports = router;