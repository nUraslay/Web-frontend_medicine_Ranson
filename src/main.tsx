import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./pancreatitis_styles.css";
import "./pancreatitis_pages.css";
import PancreatitisApp from "./PancreatitisApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PancreatitisApp />
  </React.StrictMode>
);
