require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var projectRoutes = require('./routes/projectRoutes');
var taskRoutes = require('./routes/taskRoutes');
var authRoutes = require('./routes/authRoutes');
var dashboardRoute = require('./routes/dashboardRoute');
var adminRoute = require('./routes/adminRoute');
var app = express();
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
app.use(function (req, res, next) {
    next(createError(404));
});
module.exports = app;
//# sourceMappingURL=app.js.map