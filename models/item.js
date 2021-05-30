const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = Schema({
    name:String,
    storename:String,
    owner:String,
    price:String,
    type:String,
    ownerid:{type:Schema.ObjectId,ref:'User'},
    storeid:{type:Schema.ObjectId,ref:'Store'}
})

module.exports = mongoose.model('Item',itemSchema)