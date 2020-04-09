// const jsonParser = express.json();
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.js');

// createToken

const createToken = function (id) {

    const secret = 'SuperSecretKeyForMyFirstServer123';
    const token = jwt.sign({userId: id, exp: Math.floor(Date.now() / 1000) + (60 * 2)}, secret);

    const secretRef = 'SecretKeyForRefreshToken123987654';
    const refreshToken = jwt.sign({userId: id}, secretRef);

    const auth = new Auth({
        user_id: id,
        token: token,
        refreshToken: refreshToken,
    });

    let obj = {token: token, refreshToken: refreshToken};

    auth.save(function (err) {
        if (err) {
            return console.log(err);
        }
    });

    return obj;

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

    const x = req.params.token;
    const id = jwt.decode(x);

    if (id.exp < (Math.floor(Date.now() / 1000))) {
        console.log("Token is bad");
        console.log(id.exp);
        console.log((Math.floor(Date.now() / 1000)));
        return res.status(401).send("Token is bad")
    }

    Auth.findOne({user_id: id.userId}, function (err, auth) {

        if (err) {
            return res.status(403).send("bad req");
        }

        const token = auth.token;

        if (x === token) {
            req.body.id = id.userId;
            next();
        } else {
            res.status(403).send("unauthorized"); //here do whatever you want to do
        }
    });


}

function refreshToken(req, res) {

    // console.log("tuk tuk");
    // res.status(401).send("All is good");

    //remove()
    Auth.findOne({token: req.body.token}, function (err, auth) {

        if(err){
            return res.status(403).send(err);
        }


        if(auth.refreshToken === req.body.refreshToken){

            const newTokens = createToken(auth.user_id);
            auth.remove();
            console.log(newTokens);
            return res.send(newTokens);
        }else{
            return res.status(403);
        }

    })

}

module.exports = {
    createToken,
    checkToken,
    refreshToken,
}