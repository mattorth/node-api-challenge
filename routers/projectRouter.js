const express = require('express');

// database models
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.status(201).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving projects" });
        });
});

// GET projects by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    projectDb.get(id)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retrieving project" });
        });
});

// POST project
router.post('/', validateProject, (req, res) => {
    const project = req.body;

    projectDb.insert(project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error adding project" });
        });

});

// PUT project
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    if(!update) {
        res.status(400).json({ message: "please include update information" });
    };

    projectDb.update(id, update)
        .then(project => {
            if(project) {
                res.status(201).json(project);
            } else {
                res.status(404).json({ message: "project id could not be found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error updating project" });
        });
});

// DELETE project
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectDb.remove(id)
        .then(del => {
            res.status(201).json({ message: "project successfully deleted" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error deleting project" });
        });
});

// GET Actions for a project
router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;

    projectDb.getProjectActions(projectId)
        .then(actions => {
            res.status(201).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error retreiving actions for this project" });
        });
});

// custom middleware

function validateProject(req, res, next) {
    const project = req.body;
  
    if(!project.name) {
      res.status(400).json({ message: "missing project name" })
    };
  
    if(!project.description) {
      res.status(400).json({ message: "missing required description" })
    };
  
    next();
  }

module.exports = router;