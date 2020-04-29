const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

function checkAccess(req, res, next) {

    console.log('');
    console.log(req.query);
    console.log('');

    if((Object.keys(req.query.token).length === 4) || (req.query.token === undefined)){
        return res.status(405).send('Token is empty');
    }

    const x = req.query.token;
    const obj = jwt.decode(x);

    if (obj.exp < (Math.floor(Date.now() / 1000))) {
        return res.status(401).send("Token is bad")
    }

    User.findOne({_id: obj.userId}, function (err, user) {

        if (err) {
            return res.status(404).send("bad req");
        }

        if(user === {}){
            return res.status(404).send("unauthorized");
        }

        if (user.userRole === "Admin") {
            next();
        } else {
            res.status(403).send("do not have access");
        }
    });


}

module.exports = {
    checkAccess,
}