const jwt = require('jwt-simple')
const secret = 'My_Secretkey_123'

function ceratetoken(user){
    var payload = {
        sub:user._id,
        name:user.name,
        email:user.email,
        phno:user.phno,
        Role:user.Role
    }

    var token = jwt.encode(payload,secret);
    return token;
}

module.exports = {
    ceratetoken
}