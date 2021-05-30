

const express = require('express')

const api = express.Router()
const user_controller = require('../controllers/user')
const md_auth = require('../middlewares/authenticate')

api.get('/sellers',md_auth.authenticate,user_controller.getsellerlist)
api.get('/newsellers',md_auth.authenticate,user_controller.newseller)
api.get('/newbuyerslist',md_auth.authenticate,user_controller.newbuyers)
api.get('/newbuyers',md_auth.authenticate,user_controller.getnewbuyerslist)

api.get('/all',md_auth.authenticate,user_controller.getall);

api.get('/productdell',md_auth.authenticate,user_controller.getsellingdetails)

module.exports = api