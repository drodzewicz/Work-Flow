import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ auth, path, component }) {
	return auth ? <Route exact path={path} component={component} /> : <Redirect to="/" />;
}

ProtectedRoute.propTypes = {
	auth: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
