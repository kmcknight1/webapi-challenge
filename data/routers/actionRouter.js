const express = require("express");

const Actions = require("../helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", validateUpdate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Actions.update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(deleted => {
      res.status(200).json({ message: `action with ID ${id} was deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//CUSTOM MIDDLEWARE ------------------------------------>

// function validateActionId(req, res, next) {
//   const { id } = req.params;

//   Actions.get(id)
//     .then(response => {
//       if (response) {
//         next();
//       } else {
//         res.status(400).json({ message: "Invalid action ID" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ message: "NOT WORKING" });
//     });
// }

function validateUpdate(req, res, next) {
  const update = req.body;

  if (!Object.keys(update).length) {
    return res.status(400).json({ message: "missing update data" });
  } else if (!update.description && !update.notes && !update.completed) {
    return res.status(400).json({
      message:
        "must update one of the existing fields: description, notes, or completed"
    });
  } else {
    next();
  }
}

module.exports = router;
