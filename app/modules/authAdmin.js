const jwt = require('jsonwebtoken');

function checkAccess(req, res, next) {


    if((req.query.token === undefined)){
        return res.status(405).send('Token is empty');
    }


    jwt.verify(req.query.token, 'SuperSecretKeyForMyFirstServer123', function (err, data) {

        if(err){
                return res.status(401).send("ERROR in jwt verify");
        }


        if(data.userRole === 'Admin'){
            next();
        }else{
            res.sendStatus(403);
        }

    })





}

module.exports = {
    checkAccess,
}