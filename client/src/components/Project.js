import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Card, Paper, CardContent, Button } from "@material-ui/core";

import Action from "./Action";

const useStyles = makeStyles({
  paper: {
    width: "80%",
    margin: "2rem"
  },
  card: {
    padding: "0.5rem"
  }
});

const Project = props => {
  const classes = useStyles();
  const [actions, setActions] = useState([]);
  const [actionsDisplayed, setActionsDisplayed] = useState(false);

  function displayActions() {
    axios
      .get("http://localhost:5000/api/projects/1/actions")
      .then(res => {
        console.log(res.data);
        setActions(res.data);
        setActionsDisplayed(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function deleteProject() {
    axios
      .delete(`http://localhost:5000/api/projects/${props.project.id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Paper className={classes.paper}>
      <Card className={classes.card}>
        <h2>{props.project.name}</h2>
        <CardContent>
          <h2>Description:</h2>
          <p>{props.project.description}</p>
          {actionsDisplayed === false ? (
            <Button
              onClick={e => {
                e.preventDefault();
                displayActions();
              }}
            >
              Display Actions
            </Button>
          ) : (
            actions.map(action => {
              return <Action action={action} />;
            })
          )}
        </CardContent>
        <Button
          onClick={e => {
            e.preventDefault();
            deleteProject();
            window.location.reload();
          }}
          color="secondary"
        >
          Delete Project
        </Button>
      </Card>
    </Paper>
  );
};

export default Project;
