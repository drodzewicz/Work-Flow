import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ auth, path, render }) {
	return auth ? <Route exact path={path} render={render} /> : <Redirect to="/" />;
}

ProtectedRoute.propTypes = {
	auth: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	render: PropTypes.func.isRequired,
};

export default ProtectedRoute;
