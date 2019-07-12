const express = require("express");

const Projects = require("../helpers/projectModel");
const Actions = require("../helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", validateProject, (req, res) => {
  const project = req.body;

  Projects.insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const { id } = req.params;
  const description = req.body.description;
  const notes = req.body.notes;

  Actions.insert({ project_id: id, description: description, notes: notes })
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", validateProjectId, validateUpdate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(deleted => {
      res.status(200).json({ message: `Project with ID ${id} was deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//CUSTOM MIDDLEWARE -------------------------------------------------->
function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.get(id)
    .then(response => {
      if (response) {
        next();
      } else {
        res.status(400).json({ message: "Invalid project ID" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function validateProject(req, res, next) {
  const project = req.body;

  if (!Object.keys(project).length) {
    return res.status(400).json({ message: "missing project data" });
  } else if (!project.name || !project.description) {
    return res
      .status(400)
      .json({ message: "project must have both a name and description" });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  const action = req.body;

  if (!Object.keys(action).length) {
    return res.status(400).json({ message: "missing action data" });
  } else if (!action.description || !action.notes) {
    return res
      .status(400)
      .json({ message: "action must have both a description and notes" });
  } else {
    next();
  }
}

function validateUpdate(req, res, next) {
  const update = req.body;

  if (!Object.keys(update).length) {
    return res.status(400).json({ message: "missing update data" });
  } else if (!update.description && !update.name && !update.completed) {
    return res.status(400).json({
      message:
        "must update one of the existing fields, name, description, or completed"
    });
  } else {
    next();
  }
}

module.exports = router;
