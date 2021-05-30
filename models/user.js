const mongoose = require('mongoose')

const Schema= mongoose.Schema;

const userSchema = Schema({
    name:String,
    email:String,
    password:String,
    phno:String,
    Role:String,
    createdAt:String,
    seenstatus:Boolean
})

module.exports = mongoose.model('User',userSchema)