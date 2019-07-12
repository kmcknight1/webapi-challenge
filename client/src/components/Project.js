import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    width: "80%"
  },
  card: {
    padding: "1rem"
  }
});

const Project = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Card className={classes.card}>
        <h2>{props.project.name}</h2>
      </Card>
    </Paper>
  );
};

export default Project;
