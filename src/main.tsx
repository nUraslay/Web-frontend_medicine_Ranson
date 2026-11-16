import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./pancreatitis_styles.css";
import "./pancreatitis_pages.css";
import PancreatitisApp from "./PancreatitisApp";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PancreatitisApp />
    </Provider>
  </React.StrictMode>
);
