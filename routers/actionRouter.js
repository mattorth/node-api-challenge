const express = require('express');

// database models
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

// GET all actions
router.get('/', (req, res) => {
    actionDb.get()
        .then(actions => {
            res.status(201).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving actions" });
        });
});

// GET actions by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    actionDb.get(id)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving action" });
        });
});

// POST action
router.post('/', (req, res) => {
    const action = req.body
    const project_id = action.project_id;

    projectDb.get(project_id)
        .then(project => {
            if(project) {
                res.status(201).json({ message: "project id exists" });
            } else {
                res.status(404).json({ message: "project id could not be found" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving project id" })
        });

    actionDb.insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error adding action" });
        });

});

// PUT action
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    actionDb.update(id, update)
        .then(action => {
            if(action) {
                res.status(201).json(action);
            } else {
                res.status(404).json({ message: "action id could not be found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error updating action" });
        });
});

// Delete action
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    actionDb.remove(id)
        .then(del => {
            res.status(201).json({ message: "action successfully deleted" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error deleting action" });
        });
});

module.exports = router;