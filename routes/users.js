const express = require('express');
const { User } = require('../models/user');
const { authenticateUser } = require('../middlewares/authentication');
const _ = require('lodash');

const router = express.Router();

router.get('/',(req,res) => {
    User.find()
    .then((users) => {
        if(users) {
            res.send({
                users,
                message: 'displaying all the users'
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

// signup
router.post('/',(req,res) => {
    let body = _.pick(req.body, ['username','email','password','mobile']);
    let user = new User(body);
    
    user.save()
    .then((user) => {
        return user.generateToken();
    })
    .then((token) => {
        res.header('x-auth',token).send(user);
    })
    .catch((err) => {
        res.status(404).send(err);
    })
})

// login
router.post('/login', authenticateUser, (req,res) => {
    let body = _.pick(req.body, ['email','password']);
    User.findByEmailAndPassword(body.email, body.password)
    .then((user) => {
        return user.generateToken();
    })
    .then((token) => {
        res.header('x-auth',token).send();
    })
    .catch((err) => {
        res.send(err);
    })
})

// logout
router.delete('/logout', authenticateUser, (req,res) => {
    req.locals.user.deleteToken(req.locals.token)
    .then(() => {
        res.send();
    })
    .catch((err) => {
        res.send(err);
    })
})

// profile
router.get('/profile', authenticateUser, (req,res) => {
    res.send(req.locals.user);
})

module.exports = {
    userRouter: router
}