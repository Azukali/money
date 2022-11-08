import React, { Component } from "react";
import { HashRouter, Route,Switch } from "react-router-dom";
import Login from "../index/login/index";
import Income from '../index/income/index'
export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Income} />
          {/* <Route path="/messageChart" component={MessageChart} /> */}
        </Switch>
      </HashRouter>
    );
  }
}