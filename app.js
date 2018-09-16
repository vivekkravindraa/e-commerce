const express = require('express');
const mongoose = require('./config/db');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const { ObjectId } = require('mongodb');
const _ = require('lodash');

const { Category } = require('./models/category');
const { Product } = require('./models/product');
const { User } = require('./models/user');
const { Order } = require('./models/order');

const { categoryRouter } = require('./routes/categories');
const { productRouter } = require('./routes/products');
const { userRouter } = require('./routes/users');
const { orderRouter } = require('./routes/orders');

const app = express();
const port = 3000;

app.use(morgan('short'));
app.use(bodyParser.json());

app.use('/categories',categoryRouter);
app.use('/products',productRouter);
app.use('/users',userRouter);
app.use('/orders',orderRouter);

app.get('/',(req,res) => {  
    res.send({
        message: 'Welcome to the E-Commerce App'
    })
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})