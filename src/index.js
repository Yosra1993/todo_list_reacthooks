import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router basename={"/todo_list_reacthooks"} history={history}> {/* Gh-pages deployment with react-router */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
