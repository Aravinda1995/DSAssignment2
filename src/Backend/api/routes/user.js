const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signUp', (req,res, next) => {
    User.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user >= 1) {
                return res.status(409).json({
                    message: 'username exists'
                })
            } else {
                bcrypt.hash(req.body.password,10,(err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            fName: req.body.fName,
                            lName: req.body.lName,
                            username: req.body.username,
                            password: hash,
                            nic: req.body.nic,
                            email: req.body.email
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
    });
});

router.get('/:username', (req, res, next) => {
    const id = req.params.username;
    User.find({username: id}).exec().then(doc => {
        const response = {
            nic: doc.nic
        }
        return res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
});

router.post('/logIn', (req,res,next) => {
    User.find({ username: req.body.username})
        .exec()
        .then(users => {
            if (users.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        username: users[0].username,
                        _id: users[0]._id
                    }, "secret", {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;