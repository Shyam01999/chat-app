import React from "react";
import { Helmet } from "react-helmet-async";

function Title({ title = "Chat App", description = "This is our Chat App" }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" description={description} />
      <meta name="keyword" content="React chat app, Mern chat app" />
      <meta charSet="utf-8" />
    </Helmet>
  );
}

export default Title;
