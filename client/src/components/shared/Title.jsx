import React from "react";
import { Helmet } from "react-helmet-async";

function Title({ title = "Chat App", description = "This is our Chat App" }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta description={description} />
    </Helmet>
  );
}

export default Title;
