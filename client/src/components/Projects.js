import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Card } from "@material-ui/core";

const Projects = props => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ marginTop: "9rem" }}>
      <Card>
        <h3>Project</h3>
      </Card>
    </div>
  );
};

export default Projects;
