import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";

import Project from "./Project";

const Projects = props => {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div
      style={{
        marginTop: "9rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
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
