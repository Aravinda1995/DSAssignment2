
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TicketBooking = require('../models/Railway');

//Find specific object
router.get('/:ticketId', (req, res, next) => {
    const id = req.params.ticketId;
    TicketBooking.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json({
                ticketBooking: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/ticketInfo/'+ doc._id
                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Get all the entries
router.get('/', (req, res, next) => {
   TicketBooking.find()
       .select('_id toStation fromStation noOfTickets noOfAdults nic date noOfChildren')
       .exec()
       .then(docs => {
            const response = {
                count: docs.length,
                bookings: docs.docs.map(doc =>{
                    return {
                        toStation: doc.toStation,
                        fromStation: doc.fromStation,
                        noOfTickets: doc.noOfTickets,
                        noOfChildren: doc.noOfChildren,
                        noOfAdults: doc.noOfAdults,
                        nic: doc.nic,
                        date: doc.date,
                        _id: doc._id,
                        request: {
                                type: 'GET',
                                url: 'http://localhost:3001/ticketInfo/'+ doc._id
                        }
                    }
                })
            };
           if (docs.length >= 0) {
               res.status(200).json(response);
           } else {
               res.status(404).json({
                   message: "Database doesn't have any ticket bookings"
               });
           }
       })
       .catch(err =>{
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
});

//Add data to the server
router.post('/addBooking', (req, res, next) => {
    const ticketBooking = new TicketBooking({
        _id: new mongoose.Types.ObjectId(),
        fromStation: req.body.fromStation,
        toStation: req.body.toStation,
        noOfTickets: req.body.noOfTickets,
        noOfAdults: req.body.noOfAdults,
        noOfChildren: req.body.noOfChildren,
        nic: req.body.nic,
        date: req.body.date
    });

    ticketBooking.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Updated',
            createdBooking: {
                toStation: result.toStation,
                fromStation: result.fromStation,
                noOfTickets: result.noOfTickets,
                noOfChildren: result.noOfChildren,
                noOfAdults: result.noOfAdults,
                nic: result.nic,
                date: result.date,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/ticketInfo/'+ result._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
});


module.exports = router;