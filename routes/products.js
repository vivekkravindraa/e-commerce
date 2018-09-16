const express = require('express');
const { Product } = require('../models/product');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.get('/',(req,res) => {
    Product.find()
    .then((products) => {
        if(products) {
            res.send({
                products,
                message: 'displaying all the products'
            })
        } else {
            res.send({
                notice: 'the collection is empty!!!'
            });
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

    Product.findById(id)
    .then((product) => {
        if(product) {
            res.send({
                product,
                notice: 'displaying the product'
            });
        } else {
            res.send({
                notice: 'data with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/',(req,res) => {
    let body = _.pick(req.body, ['name','price','description','category','codEligible','stock']);
    let product = new Product(body);

    product.save()
    .then((product) => {
        if(product) {
            res.send({
                product,
                message: 'successfully created the product'
            })
        } else {
            res.send({
                notice: 'unable to insert the record'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.put('/:id',(req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name','price','description','codEligible','stock']);

    if(!ObjectId.isValid(id)) {
        res.send({
            notice: 'invalid object id'
        })
    }

    Product.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((product) => {
        if(product) {
            res.send({
                product,
                message: 'successfully updated the product'
            });
        } else {
            res.send({
                notice: 'data with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

router.delete('/:id',(req,res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id)
    .then((product) => {
        if(product) {
            res.send({
                product,
                message: 'Successfully removed the product'
            })
        } else {
            res.send({
                notice: 'data with this id isn\'t found'
            })
        }
    })
    .catch((err) => {
        res.send(err);
    })
})

module.exports = {
    productRouter: router
}