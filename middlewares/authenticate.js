const jwt = require('jwt-simple')
const secret = 'My_Secretkey_123'

function authenticate(req,res,next){
    var token = req.headers.auth
    // console.log(token)
    var payload = jwt.decode(token,secret)
    // console.log(payload)
    req.user = payload
    next();  
}

module.exports = {
    authenticate
}