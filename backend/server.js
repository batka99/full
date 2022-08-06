const express = require('express')
const request = require('request');
const path = require('path');
const axios =  require('axios')

const http = require("http")
// const cors = requie('cors')
const dotenv =  require('dotenv')
// const logger =  require('./middleware/logger')
// const connectDB = require('./config/db')


dotenv.config({path: './config/config.env'})

// const socketUtils = require('./utils/socketUtils')

// connectDB()
// const categoriesRoutes = require('./routes/categories')
const qpayRouter = require('./routes/qpay')
// const productRoutes = require('./routes/createProduct/createProduct')

// const server = http.createServer(app)
// const io = socketUtils.sio(server)

const app = express();

app.use(express.json());
app.use(express.static(path.join("../frontend/vending", 'build')));

// socketUtils.connection(io)
// const socketIOMiddleWare = (req, res, next) =>{
//     req.io = io
// }

// app.use(logger);

// app.use('/api/v1/categories', categoriesRoutes)
// app.use('/api/v1/product', productRoutes)
app.use('/api/v1/qpay', qpayRouter)





// app.get('/', (req, res)=>{res.send({message:"vending", surgalt:"merchant"})})
app.get('/', function (req, res) {
    res.sendFile(path.join("../frontend/vending", 'build', 'index.html'));
  });

app.listen(process.env.PORT, console.log(`Express server ${process.env.PORT} порт дээр ажиллаа.`))