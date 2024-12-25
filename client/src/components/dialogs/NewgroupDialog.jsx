import React, { lazy } from "react";

const NewGroup = lazy(() => import("../specific/NewGroup"));

function NewgroupDialog() {
  return (
    <div>
      <NewGroup/>
    </div>
  );
}

export default NewgroupDialog;
