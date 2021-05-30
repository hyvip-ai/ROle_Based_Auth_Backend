

const express = require('express')

const md_auth = require('../middlewares/authenticate')

const api = express.Router()
const user_controllers = require('../controllers/user')

const seller_controllers = require('../controllers/store')
api.get('/sellerdetails',md_auth.authenticate,user_controllers.sellerdetails)

api.post('/addstore',md_auth.authenticate,seller_controllers.addstore)

api.get('/shoplist',md_auth.authenticate,seller_controllers.storelist)

api.get(`/delete/:id`,md_auth.authenticate,seller_controllers.deleteshop)

api.post('/additem/:id',md_auth.authenticate,seller_controllers.additem)

api.get('/storedetail/:id',md_auth.authenticate,seller_controllers.getstoredetails)

api.get('/items/:id',md_auth.authenticate,seller_controllers.getitems)

api.get('/deleteitem/:id',md_auth.authenticate,seller_controllers.deleteitem)

api.get('/getallorders',md_auth.authenticate,seller_controllers.getsellerorders)

api.get('/acceptorder/:id',md_auth.authenticate,seller_controllers.acceptorder)

api.get('/deleteorder/:id',md_auth.authenticate,seller_controllers.deleteorder)

module.exports = api