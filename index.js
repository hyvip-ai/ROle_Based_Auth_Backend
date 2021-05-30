const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoDb = 'mongodb://localhost:27017/mystores'
const port = 3000
const seller_routes = require('./routes/seller');
const buyer_routes = require('./routes/buyer');
const user_routes = require('./routes/user');
const cors = require('cors')
app.use(cors())

const administrator_routes = require('./routes/administrator')

const default_routes = require('./routes/default')
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect(mongoDb , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>{
    app.listen(port,()=>{
        console.log('> Connected...')
        console.log('> Write Some Code You Moron.......')
    })
})
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}` ))

app.use('/',default_routes);

app.use('/seller',seller_routes);
app.use('/buyer',buyer_routes);
app.use('/administrator',administrator_routes)
// app.use('/administrator',administrator_routes);

app.use('/api',user_routes)