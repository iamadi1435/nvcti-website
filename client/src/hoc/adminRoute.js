import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isAdminLogin } from "../utils/isAdminLoggedIn";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (isAdminLogin() ? <Component {...props} /> : <Redirect to="/" />)} />
);

AdminRoute.propTypes = {
  isAdminLogin: PropTypes.func.isRequired,
};

export default connect(null, { isAdminLogin })(AdminRoute);
