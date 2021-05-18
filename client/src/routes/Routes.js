import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { WelcomePage, ProfilePage, BoardPage, DashboardPage, ErrorPage } from "views";
import ProtectedRoute from "./ProtectedRoute";
import { UserContext } from "context/UserContext";
import queryString from "query-string";

const Routes = () => {
	const [{ authStatus }] = useContext(UserContext);

	return (
		<Switch>
			<Route exact path="/" component={authStatus === "success" ? DashboardPage : WelcomePage} />
			<ProtectedRoute auth={authStatus === "success"} path="/profile" component={ProfilePage} />
			<ProtectedRoute
				auth={authStatus === "success"}
				path="/board/:id"
				render={({ match, location }) => <BoardPage boardId={match.params.id} query={queryString.parse(location.search)} />}
			/>
			<Route exact path="/error/:code" render={({match}) => <ErrorPage errorCode={match.params.code} />} />
			<Route render={() => <Redirect to="/" />} />
		</Switch>
	);
};

export default Routes;
