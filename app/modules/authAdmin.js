const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

function checkAccess(req, res, next) {

    console.log("admin access");

    if((Object.keys(req.params.token).length === 4) && (req.params.token === undefined)){
        return res.status(403).send('Token is empty');
    }

    const x = req.params.token;
    const obj = jwt.decode(x);

    if (obj.exp < (Math.floor(Date.now() / 1000))) {
        return res.status(401).send("Token is bad")
    }

    User.findOne({_id: obj.userId}, function (err, user) {

        if (err) {
            return res.status(403).send("bad req");
        }

        if(user === {}){
            return res.status(403).send("unauthorized");
        }

        if (user.userRole === "Admin") {
            next();
        } else {
            res.status(405).send("do not have access");
        }
    });


}

module.exports = {
    checkAccess,
}