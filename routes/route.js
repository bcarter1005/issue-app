const express = require('express');
const router = express.Router();

const Issue = require('../models/issue');

// get issues!
router.get('/issues', (req, res, next) => {
    Issue.find((err, issue) => {
        res.json(issue);
    })
});


// gets issue by id!
router.get('/issues/:id', (req, res) => {
    Issue.findById(req.params.id, (err,issue) => {
        if(err)
            console.log(err);
        else
            res.json(issue);
    });
});

//add issue!
router.post('/issues/add',(req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

//update issue!
router.post('/issues/update/:id', (req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update Done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
    });
});

//deletes issue by id!
router.delete('/issues/delete/:id', (req, res, next) => {
    Issue.findByIdAndDelete({_id: req.params.id}, (err, result) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
    
    
});

module.exports = router;