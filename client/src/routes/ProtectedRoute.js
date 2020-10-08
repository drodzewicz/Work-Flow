import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ auth, path, render, component }) {
	return auth ? <Route exact path={path} render={render} component={component} /> : <Redirect to="/" />;
}

ProtectedRoute.defaultProps = {
	render: undefined,
	component: undefined
};
ProtectedRoute.propTypes = {
	auth: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	render: PropTypes.func,
	component: PropTypes.func,
};

export default ProtectedRoute;
