const {
    Router
} = require('express')
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');

module.exports = router;
