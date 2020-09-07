import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { WelcomePage, ProfilePage, BoardPage, DashboardPage, ErrorPage } from "pages";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
	const token = localStorage.getItem("token");

	return (
		<Switch>
			<Route exact path="/" component={!!token ? DashboardPage : WelcomePage} />
			<ProtectedRoute auth={!!token} path="/profile" component={ProfilePage} />
			<ProtectedRoute
				auth={!!token}
				path="/board/:id"
				component={({ match }) => <BoardPage boardId={match.params.id} />}
			/>
			<ProtectedRoute auth={!!token} path="/error" component={ErrorPage} />
			<Route render={() => <Redirect to="/" />} />
		</Switch>
	);
};

export default Routes;
