require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;



const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const mongoDB = "will input";

main().catch((err)=> console.log(err));
async function main(){
  await mongoose.connect(mongoDB);
}

const indexRouter = require('./routes/index');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes')
const dashboardRoute = require('./routes/dashboardRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projects', projectRoutes);
app.use('/task', taskRoutes);
app.use('/auth', authRoutes);
app.use('/', dashboardRoute);
app.use('/', adminRoute);   

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
