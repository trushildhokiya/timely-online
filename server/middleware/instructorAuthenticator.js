const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');

const instructorAuthenticator = asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    try {
        const valid = jwt.verify(token, process.env.JWT_SECRET);

        if (!valid) {

            res.status(401).json();
            throw new Error('Invalid token')
        }

        const decodedData = jwtDecode(token);

        if (decodedData.role === 'instructor') {
            res.decodedData = decodedData
            next();

        } else {

            res.status(403)
            throw new Error('Forbidden: Not an admin')
        }
    } catch (err) {

        res.status(res.statusCode ? res.statusCode :500)
        throw new Error(err.message? err.message :'Internal Server Error')
    }
});

module.exports = instructorAuthenticator;