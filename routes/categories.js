const express = require('express');
const { Category } = require('../models/category');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const router = express.Router();

router.get('/',(req,res) => {
    Category.find()
    .then((categories) => {
        if(categories) {
            res.send({
                categories,
                message: 'displaying all the categories'
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

    Category.findById(id)
    .then((category) => {
        if(category) {
            res.send({
                category,
                message: 'successfully found the category'
            });
        } else {
            res.send({
                notice: 'data with this id isn\'t found'
            });
        }
    })
    .catch((err) => {
        res.send(err);
    })

})

router.post('/',(req,res) => {
    let body = _.pick(req.body, ['categoryName']);
    let category = new Category(body);

    category.save()
    .then((category) => {
        if(category) {
            res.send({
                category,
                notice: 'successfully created the category'
            });
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
    let body = _.pick(req.body, ['categoryName']);

    if(!ObjectId.isValid(id)) {
        res.send({
            notice: 'invalid object id'
        })
    }

    Category.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((category) => {
        if(category) {
            res.send({
                category,
                notice: 'successfully updated the category'
            });
        } else {
            res.send({
                notice: 'data with this id isn\'t found'
            });
        }
    })
    .catch(() => {
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

    Category.findByIdAndRemove(id)
    .then((category) => {
        if(category) {
            res.send({
                category,
                notice: 'successfully deleted the category!'
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
    categoryRouter: router
}