import React, { lazy } from "react";

const Notifications = lazy(() => import("../specific/Notifications"));

function NotificationDialog() {
  return (
    <div>
      <Notifications />
    </div>
  );
}

export default NotificationDialog;
