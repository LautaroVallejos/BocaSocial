const geoip = require("geoip-lite");

router.post('/geo', async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress;
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

        user.lastedLocate = user.locate;
        user.locate = geoip.lookup(ip);
        user.ip = ip;
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