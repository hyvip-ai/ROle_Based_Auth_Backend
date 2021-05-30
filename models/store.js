const mongoose = require('mongoose')

const Schema= mongoose.Schema;
 
const storeschema = Schema({
    name:String,
    createdby:String,
    address:String,
    ownerid:{type:Schema.ObjectId,ref:'User'}
})

module.exports = mongoose.model('Store',storeschema)