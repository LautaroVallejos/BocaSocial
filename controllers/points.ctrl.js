const {
    Router
} = require('express')
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

router.post('/addPoints', async (req, res, next) => {
    try {
        const {quantity} = req.body;
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

        user.points =+ quantity;
        user.save();

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

router.post('/removePoints', async (req, res, next) => {
    try {
        const {
            quantity
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

        user.points =- quantity;
        await user.save();

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
