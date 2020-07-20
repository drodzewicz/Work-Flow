import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  WelcomePage,
  ProfilePage,
  BoardPage,
  DashboardPage,
  ErrorPage,
} from "pages";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/board/{id}" component={BoardPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/error" component={ErrorPage} />
    </Switch>
  );
}

export default Routes
