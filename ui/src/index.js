import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// pages for this product
import upload from "views/Upload/upload.js";
import home from "views/Home/home.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={home} />
      <Route path="/upload" component={upload} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
