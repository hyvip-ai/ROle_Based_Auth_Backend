

const express = require('express')

const api = express.Router()

const md_auth = require('../middlewares/authenticate')

const store_Controller = require('../controllers/store')
const user_controller = require('../controllers/user')

api.get('/detail',md_auth.authenticate,user_controller.buyerdetail)

api.get('/getalllproducts',md_auth.authenticate,store_Controller.getallitems)

api.get('/itemdetails/:id',md_auth.authenticate,store_Controller.getitemdetails)
api.post('/placeorder',md_auth.authenticate,store_Controller.placeorder)

api.get('/getmyorders',md_auth.authenticate,store_Controller.getallorders)
module.exports = api