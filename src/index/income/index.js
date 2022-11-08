import React, { } from "react";
import TopHeader from "../components/Header/TopHeader";
import { Switch, Route, Redirect } from "react-router-dom";
import SideMenu from "../components/Menu/SideMenu";
import MessageChart from "../message";
import Come from "../come"
import Life from "../life"
import { Layout } from "antd";
export default function Income(props) {

  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader></TopHeader>
        {/* <MessageChart /> */}
        <Switch>
          <Route path="/index" component={MessageChart} />
          <Route path="/come" component={Come} />
          <Route path="/life" component={Life} />
          {/* <Redirect from="/" to="/index" exact/> */}
        </Switch>
      </Layout>
    </Layout>
  );

}
