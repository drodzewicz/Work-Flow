import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "context/UserContext";
import {
  WelcomePage,
  ProfilePage,
  BoardPage,
  DashboardPage,
  ErrorPage,
} from "pages";


const Routes = () => {

  const [user,] = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/" component={user.username ? DashboardPage : WelcomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/board/{id}" component={BoardPage} />
      <Route exact path="/error" component={ErrorPage} />
    </Switch>
  );
}

export default Routes
