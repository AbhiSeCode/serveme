const express= require('express');
const path = require('path')
const cors= require('cors')
const mongoose= require('mongoose');
var logger = require('morgan');

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())


const userRouter = require('./routes/user');
const itemRouter= require('./routes/item');
const orderRouter= require('./routes/order');


const port= process.env.PORT ||8080
app.use(express.static(path.join(__dirname, '../build')));

//connecting to database
const uri= process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify:false})
const connection= mongoose.connection
connection.once('open', ()=>{
  console.log('database connected successsfully')
})


app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/item', itemRouter)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
  
app.use(logger('dev'));


app.listen(port, ()=>{
    console.log(`Active on port ${port}`)
})