function status(req,res){

    return res.send({name:'Store App',version:'1.0.0',Status:'Running'})
}

module.exports = {
    status
}