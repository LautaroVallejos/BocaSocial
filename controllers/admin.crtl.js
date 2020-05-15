const {
    Router
} = require('express')
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

router.post('/addAdmin', async (req, res, next) => {
    try {
        const {email} = req.body;
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
        if(decoded.isSuperAdmin){
            const userAlterate = await User.find({"email":email}, {
                password: 0
            });

            userAlterate.isSuperAdmin = true;

            await userAlterate.save();
        }else{
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

router.post('/removeAdmin', async (req, res, next) => {
    try {
        const {
            email
        } = req.body;
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
        if (decoded.isSuperAdmin) {
            const userAlterate = await User.find({
                "email": email
            }, {
                password: 0
            });

            userAlterate.isSuperAdmin = false;

            await userAlterate.save();
        } else {
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
