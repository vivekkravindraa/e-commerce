const express = require('express');
const { Order } = require('../models/order');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.get('/',(req,res) => {
    Order.find()
    .then((orders) => {
        if(orders) {
            res.send({
                orders,
                message: 'displaying all the orders'
            });
        } else {
            res.send({
                notice: 'the collection is empty!!!'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/:id',(req,res) => {
    let id = req.params.id;

    if(!ObjectId.isValid(id)) {
        res.send({
            notice: 'invalid object id'
        })
    }

    Order.findById(id)
    .then((order) => {
        if(order) {
            res.send({
                order,
                message: 'displaying the order'
            })
        } else {
            res.send({
                notice: 'order with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/',(req,res) => {
    let body = _.pick(req.body, ['orderDate','orderNumber','user']);
    let order = new Order(body);

    order.save()
    .then((order) => {
        if(order) {
            res.send({
                order,
                message: 'successfully inserted the order'
            });
        } else {
            res.send({
                notice: 'order with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.put('/:id',(req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['orderDate','orderNumber']);

    if(!ObjectId.isValid(id)) {
        res.send({
            notice: 'invalid object id'
        })
    }

    Order.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((order) => {
        if(order) {
            res.send({
                order,
                message: 'succesfully updated the order'
            });
        } else {
            res.send({
                notice: 'order with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.delete('/:id',(req,res) => {
    let id = req.params.id;

    if(!ObjectId.isValid(id)) {
        res.send({
            notice: 'invalid object id'
        })
    }

    Order.findByIdAndDelete(id)
    .then((order) => {
        if(order) {
            res.send({
                order,
                message: 'successfully deleted the order'
            });
        } else {
            res.send({
                notice: 'order with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

module.exports = {
    orderRouter: router
}