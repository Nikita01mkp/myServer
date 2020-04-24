
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.js');



const createToken = function (id) {

    const secret = 'SuperSecretKeyForMyFirstServer123';
    const token = jwt.sign({userId: id, exp: Math.floor(Date.now() / 1000) + (60 * 30)}, secret);

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

};



function checkToken(req, res, next) {

    if(Object.keys(req.params.token).length === 4){
        return res.status(403).send('Token is empty');
    }

    const x = req.params.token;
    const id = jwt.decode(x);

    if (id.exp < (Math.floor(Date.now() / 1000))) {
        return res.status(401).send("Token is bad")
    }

    Auth.findOne({user_id: id.userId}, function (err, auth) {

        if (err) {
            return res.status(403).send("bad req");
        }

        if(auth === {}){
            return res.status(403).send("unauthorized");
        }

        const token = auth.token;
        if (x === token) {
            req.body.id = id.userId;
            next();
        } else {
            res.status(403).send("unauthorized");
        }
    });


}

function refreshToken(req, res) {
    if(req.body.refreshToken === undefined){
        return res.sendStatus(403);
    }

    Auth.findOne({token: req.body.token}, function (err, auth) {

        if(err){
            return res.status(403).send(err);
        }


        if(auth.refreshToken === req.body.refreshToken){

            const newTokens = createToken(auth.user_id);
            auth.remove();
            return res.send(newTokens);
        }else{
            return res.status(403).send("RefreshToken is wrong");
        }

    })

}

function deleteToken(req, res, next){


    Auth.findOne({token: req.body.token}, function (err, auth) {
      if(err){
          next();
      }

      try {
          auth.remove();
          next();
      } catch (e) {
          next();
      }

    })

}

function userLogout(req, res){


    Auth.findOne({token: req.body.token}, function (err, auth) {

        if(err){
            return res.status(400)
        }
        if (auth.refreshToken === req.body.refreshToken){
            auth.remove();
            return res.status(200).send("success");
        }

    })



}

module.exports = {
    createToken,
    checkToken,
    refreshToken,
    deleteToken,
    userLogout,
}