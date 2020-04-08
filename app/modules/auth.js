// const jsonParser = express.json();
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.js');

// createToken

const createToken = function (req) {

    const secret = 'SuperSecretKeyForMyFirstServer123';
    const id = req._id;
    const token = jwt.sign({ userId: id }, secret);
    return token;

    //const decoded = jwt.verify(token, secret);
};

// const userAuth = function (userToken) {
//
//     const secret = 'SuperSecretKeyForMyFirstServer123';
//     const token = jwt.sign({userId: id}, secret);
//     return token === userToken;
//
// };

function checkToken(req, res, next) {
    const x = req.token; //This is just an example, please send token via header
    if (x === token)
    {
        next();
    }
    else
    {
        res.status(401).send("unauthorized"); //here do whatever you want to do
    }
}

module.exports = {
    createToken,
    checkToken,
}