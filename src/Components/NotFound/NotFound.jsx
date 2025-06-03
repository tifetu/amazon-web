import React from "react";
import LayOut from "../LayOut/LayOut";

function NotFound() {
  return (
    <LayOut>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you’re looking for doesn’t exist.</p>
      </div>
    </LayOut>
  );
}

export default NotFound;
