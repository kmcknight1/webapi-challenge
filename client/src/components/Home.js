import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button, AppBar } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#AFF2ED",
    "& h1": {
      textShadow: "1px 1px 2px black"
    }
  },
  textField: {
    textAlign: "center"
  }
});

const Home = props => {
  const [name, setName] = useState("");
  const [nameAdded, setNameAdded] = useState(false);
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      {nameAdded === false ? (
        <div style={{ width: "80%" }}>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={e => {
              e.preventDefault();
              setNameAdded(true);
              props.history.push("/projects");
            }}
          >
            <TextField
              className={classes.textField}
              label="Name"
              variant="outlined"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <Button type="submit">Set Name</Button>
          </form>
        </div>
      ) : (
        <h1>{`${name}'s Projects`}</h1>
      )}
    </AppBar>
  );
};

export default Home;
