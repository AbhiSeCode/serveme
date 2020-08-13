var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors= require('cors')
const mongoose= require('mongoose');

require('dotenv').config()

var indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const itemRouter= require('./routes/item');
const orderRouter= require('./routes/order');

var app = express();


//connecting to database
const uri= process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify:false})
const connection= mongoose.connection
connection.once('open', ()=>{
  console.log('database connected successsfully')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/item', itemRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
