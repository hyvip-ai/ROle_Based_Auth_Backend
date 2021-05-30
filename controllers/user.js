const User = require('../models/user')
const moment = require('moment')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')
const mongoosePaginate = require('mongoose-pagination')
const Order = require('../models/order')
function register(req,res){
    // console.log("asche")
    const params = req.body;
  
    if(params.name && params.email && params.password && params.phno && params.Role){
        

        var user = new User();
        User.find({email:params.email}).exec((err,succ)=>{
            if(err){
        return res.send({messege:"Searching Error"})

            }
            if(succ && succ.length>=1){
                return res.send({messege:'Same Credentials found'})
            }
            else{
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    if(err){
                        return res.send({messege:'Hash Making Error'})
                    }
                    user.password = hash;
                 
                })
    

                user.email = params.email,
                user.Role = params.Role,
                user.name = params.name,
                user.createdAt = moment().unix();
                user.seenstatus = false
                user.phno = params.phno;
                user.save((err,saveduser)=>{
                    if(err){
                        return res.send({messege:'Saving error'})
                    }
                   if(saveduser){
                    return res.send({User:saveduser})
                   }
                })
            }
        })

    }
    else{
        return res.send({messege:"Invalid Data"})
    }
}
function login(req,res){
    // console.log('asche')
    const params = req.body
//    console.log(params)
    if(params.email&& params.password){
        var email = params.email;
        var password = params.password;
        // console.log(password,email)

   
            User.findOne({email:email}).exec((err,userdata)=>{
                // console.log(userdata)
                if(err){
                    return res.send({messege:'Finding Error'})
                }
                if(userdata){
                    // console.log(userdata)
                    bcrypt.compare(password,userdata.password,(err,result)=>{
                        // console.log(result)
                        if(err){
                            return res.send({messege:'Password matching error'})
                        }
                        if(result){
                            return res.send({messege:'Login Success',
                                            User:userdata,
                                            Token:jwt.ceratetoken(userdata)})
                        }
                        else{
                            return res.send({messege:"Wrong Password"})
                        }
                    })
                }
                else{
                    return res.send({messege:"Wrong Email"})
                }
            })
        
 
    }
    else{
        return res.send({messege:"Invalid Data"})

    }
}

function getsellerlist(req,res){
 

        
    



    User.find({Role:'seller'}).sort('_id').exec((err,result)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(result){
            return res.send({messege:result})
        }
    })

}


function newseller(req,res){
    User.find({$and:[
        {Role:'seller'},
        {seenstatus:false}
    ]}).exec((err,result)=>{
        result.forEach((item,index)=>{
           User.findOneAndUpdate({_id:item._id},{$set:{seenstatus:true}},(err,succ)=>{
               if(err){
                   console.log('not updated');
               }
               if(succ){
                   console.log('Updated')
               }
           })
        })

        if(err){
            res.send({messege:'Couldnt find data'})
        }
        if(result){
            res.send({messege:result})
        }
    })
}

function newbuyers(req,res){

    User.find({Role:"buyer"}).exec((err,result)=>{
        if(err){
            return res.send({messege:'Error occured while finding'})
        }
        if(result){
            // console.log(result);
            return res.send({messege:result})
        }
    })

}

function getnewbuyerslist(req,res){

    User.find({$and:[
        {Role:'buyer'},
        {seenstatus:false}
    ]}).exec((err,mydatas)=>{
        if(err){
            return res.send({messege:'Finding Error'})
        }
        if(mydatas){
            mydatas.forEach((item,index)=>{
                // console.log(item)
                User.findOneAndUpdate({_id:item._id},{$set:{seenstatus:true}}).exec((err,succ)=>{
                    // console.log(succ)
                    console.log('Updated')
                })


            })

            res.send({messege:mydatas})
        }
    })
}

function getall(req,res){

    User.find({}).sort('seenstatus').exec((err,result)=>{
        if(err){
            return res.send({messege:'Error occured while sorting'})
        }
        if(result){
            return res.send({messege:result})
        }
    })
}

function sellerdetails(req,res){
    var user = req.user;
    res.send({seller:user}) 
}
function buyerdetail(req,res){
    return res.send({buyer:req.user})
}
function administratordetail(req,res){
    // console.log('asche')
    return res.send({administrator:req.user})
}

function getsellingdetails(req,res){

Order.find({status:'Accepted'}).exec((err,order)=>{
    if(err){
        return res.send({messege:"Error Occured"})
    }
    if(order){
        return res.send({orders:order})
    }
})

}
module.exports = {
    register,
    login,
    getsellerlist,
    newseller,
    newbuyers,
    getnewbuyerslist,
    getall,
    sellerdetails,
    buyerdetail,
    administratordetail,
    getsellingdetails
}