const Store = require('../models/store')
    

const Item = require('../models/item')


const Order = require('../models/order')
function addstore(req,res){
    const params = req.body;
    if(params.name && params.address && params.owner){ 
        var store = new Store();
        Store.find({$and:[
            {createdby:params.owner},
            {name:params.name}
        ]}).exec((err,data)=>{
            if(err){
                return res.send({messege:'Error Occurred,hehe'})
            }
            if(data && data.length){
                return res.send({messege:'The Store Already Exist Dude'}) 
            }
            else{
                store.name = params.name;
                store.createdby = params.owner;
                store.address = params.address;
                store.ownerid = req.user.sub;
        store.save((err,saved)=>{
            if(err){
                return res.send({messege:'Error Occurred,hehe'})

            }
            if(saved){
                return res.send({store:saved})
            }
        })
            }

        })
    }
    else{
        return res.send({messege:'Invalid Data'})
    }
}

function storelist(req,res){

    var owner = req.user.name;
    Store.find({createdby:owner}).exec((err,stores)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(stores){
            return res.send({mystores:stores})
        }
    })

}

function deleteshop(req,res){
    var id = req.params.id;
    Store.findOneAndRemove({_id:id}).exec((err,done)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(done){
            return res.send({messege:'Deleted'});
        }
    })
}

function additem(req,res){
    const params = req.body
    if(params.name && params.owner && params.type && params.storename && params.price){
        Item.find({$and:[
            {name:params.name},
            {storename:params.storename},
            {owner:params.owner}
        ]}).exec((err,items)=>{
            if(err){
                res.send({messege:'Invalid search'})
            }
            if(items && items.length>=1){
                res.send({messege:'Same Credentials Found'})
            }
            else{
                var item = new Item()
                item.name = params.name;
                item.storename = params.storename;
                item.owner = params.owner;
                item.type = params.type;
                item.price = params.price;
                item.ownerid = req.user.sub
                item.storeid = req.params.id
                item.save((err,saveditem)=>{
                    if(err){
                        res.send({messege:'Error occured while saving'})
                    }
                    if(saveditem){
                        res.send({item:saveditem})
                    }
                })
            }
        })
    }
    else{
        return res.send({messege:'Invalid Data'})
    }
}

function getstoredetails(req,res){

    var id = req.params.id;

    Store.findOne({_id:id}).exec((err,store)=>{
        if(err){
            res.send({messege:'Error occured while searching'})
        }
        if(store){
            res.send({shop:store})
        }
    }
    )

}

function getitems(req,res){
    var id = req.params.id;

    Store.findOne({_id:id}).exec((err,store)=>{
        if(err){
            return res.send({messege:'error occured'})
        }
        if(store){
            var name = store.name
            // console.log(name)

            Item.find({storename:name}).exec((err,items)=>{
                if(err){
                    return res.send({messege:'error occured'})
                }
                if(items){
                    return res.send({items:items})
                }
            })
        }
    })
}

function deleteitem(req,res){
    var id = req.params.id
    Item.findOneAndDelete({_id:id}).exec((err,done)=>{
        if(err){
            return res.send({messege:'Error While Deleting'})
        }
        else{
            return res.send({messege:'Deleted Item'})
        }
    })
}

function getallitems(req,res){
    Item.find({}).exec((err,items)=>{

        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(items){
            return res.send({items:items})
        }
    })
}

function getitemdetails(req,res){
    Item.findOne({_id:req.params.id}).exec((err,item)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(item){
            return res.send({item:item})
        }
    })

}

function placeorder(req,res){

    const params = req.body
    var order = new Order();

    order.productname = params.productname
    order.storename = params.storename
    order.price = params.price
    order.status = params.status
    order.storeid = params.storeid
    order.ownerid = params.ownerid
    order.productid = params.productid
    order.type = params.type
    order.save((err,saveditem)=>{
        if(err){
            return res.send({messege:'Error Occured'})

        }
        if(saveditem){
            return res.send({ordereditem:saveditem})
        }
    })
}

function getallorders(req,res){
    Order.find({}).exec((err,orders)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(orders){
            return res.send({myorders:orders})
        }
    })
}

function getsellerorders(req,res){

    Order.find({$and:[
        {ownerid:req.user.sub}
    ]}).populate('ownerid','name -_id Role').exec((err,orders)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(orders){
            return res.send({orders:orders})
        }
    })

}

function acceptorder(req,res){
    var id = req.params.id;
    Order.findOneAndUpdate({_id:id},{$set:{status:'Accepted'}},(err,data)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(data){
            return res.send({messege:'Updated',order:data})
        }
    })
}

function deleteorder(req,res){
    var id = req.params.id;
    Order.findOneAndUpdate({_id:id},{$set:{status:'Rejected'}},(err,data)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(data){
            return res.send({messege:'Updated',order:data})
        }
    })
}


module.exports = {
    addstore,
    storelist,
    deleteshop,
    additem,
    getstoredetails,
    getitems,
    deleteitem,
    getallitems,
    getitemdetails,
    placeorder,
    getallorders,
    getsellerorders,
    acceptorder,
    deleteorder

}