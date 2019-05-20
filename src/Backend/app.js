const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const homePageRoutes = require('./api/routes/Railway');
const userRoutes = require('./api/routes/user');
const mobilePaymentRoutes = require('./api/routes/mobilePayment');
const cardPaymentRoutes = require('./api/routes/cardPayment');

mongoose.connect('mongodb+srv://admin:abcd1234@cluster0-3u1lq.mongodb.net/test?retryWrites=true', {useNewUrlParser: true, useCreateIndex: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   next();
});



app.use("/ticketInfo", homePageRoutes);
app.use("/user", userRoutes);
app.use("/mobilePaymentInfo", mobilePaymentRoutes);
app.use("/cardPaymentInfo", cardPaymentRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;