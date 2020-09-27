import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { WelcomePage, ProfilePage, BoardPage, DashboardPage, ErrorPage } from "pages";
import ProtectedRoute from "./ProtectedRoute";
import { UserContext } from "context/UserContext";

const Routes = () => {
	const [{ authStatus }] = useContext(UserContext);

	return (
		<Switch>
			<Route exact path="/" component={authStatus === "success" ? DashboardPage : WelcomePage} />
			{/* <Route exact path="/profile" component={ProfilePage} /> */}
			<ProtectedRoute auth={authStatus === "success"} path="/profile" component={ProfilePage} />
			<ProtectedRoute
				auth={authStatus === "success"}
				path="/board/:id"
				render={({ match }) => <BoardPage boardId={match.params.id} />}
			/>
			<ProtectedRoute auth={authStatus === "success"} path="/error" render={ErrorPage} />
			<Route render={() => <Redirect to="/" />} />
		</Switch>
	);
};

export default Routes;
