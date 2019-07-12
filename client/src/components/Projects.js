import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinearProgress, Button, TextField } from "@material-ui/core";

import Project from "./Project";

const Projects = props => {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then(res => {
        console.log(res.data);
        setProjects(res.data);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function addProject(body) {
    axios
      .post("http://localhost:5000/api/projects", body)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div
      style={{
        marginTop: "9rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          const body = { name, description };
          addProject(body);
          window.location.reload();
        }}
      >
        <TextField
          variant="outlined"
          label="Project Name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          label="Project Description"
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />

        <Button type="submit" variant="contained">
          Create New Project
        </Button>
      </form>

      {loaded === false ? (
        <>
          <LinearProgress />
          <h2>Loading...</h2>
        </>
      ) : (
        projects.map((project, index) => {
          return <Project project={project} index={index} />;
        })
      )}
    </div>
  );
};

export default Projects;
