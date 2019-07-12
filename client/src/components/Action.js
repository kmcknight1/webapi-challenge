import React, { useState } from "react";

const Action = props => {
  return (
    <>
      <h4>{props.action.description}</h4>
      <p>{props.action.notes}</p>
    </>
  );
};

export default Action;
