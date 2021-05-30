const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = Schema({
    productname:String,

    storename:String,
    price:String,
    type:String,
    status:String,
    storeid:{type:Schema.ObjectId,ref:'Store'},
    ownerid:{type:Schema.ObjectId,ref:'User'},
    productid:{type:Schema.ObjectId,ref:'Item'},
    
})

module.exports = mongoose.model('Order',orderSchema)