const {
    Router
} = require('express')
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

router.get('/', async (req, res, next) => {
    res.end(JSON.stringify({
        auth: false,
        token: null,
        error: false,
        message: 'Apis online'
    }));
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
        await user.getLocation(res.ip);
        await user.save();

        const token = jwt.sign({
            id: user._id,
            isSuperAdmin: user.isSuperAdmin
        }, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.writeHead(200, {
            'x-access-token': token
        })
        res.end(JSON.stringify({
            auth: true,
            token: token,
            error: false,
            message: "User resgistered"
        }));

    } catch (e) {
        console.log(e);
        res.status(401).end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: 'general error'
        }))
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
            return res.status(401).res.end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                mensagge: "user not found"
            }))
        }
        
        const passwordIsValid = await user.validatePassword(password);

        if (!passwordIsValid) {
            return res.status(401).res.end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                message: 'general error'
            }))
        }
        
        user.ip = await user.getIpAddress()
        //user.latestLocate = user.locate;
        //user.locate = await user.getLocation();
        await user.save();

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
            token: token,
            error:false, 
            message:"User is login"
        }));
    } catch (e) {
        res.end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: 'general error'
        }));
    }
})

router.post('/me', async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                message: 'no token provided'
            }))
        }

        const decoded = jwt.verify(token, config.secret);

        const user = await User.findById(decoded.id, {
            password: 0
        });
        if (!user) {
            return res.status(404).end(JSON.stringify({
                auth: false,
                token: null,
                error: true,
                message: 'general error'
            }));
        }
        res.end(JSON.stringify({
            auth: true,
            token: token,
            error: false,
            message: 'Is passaged'
        }));
    } catch (e) {
        res.end(JSON.stringify({
            auth: false,
            token: null,
            error: true,
            message: 'general error'
        }));
    }
})



module.exports = router;