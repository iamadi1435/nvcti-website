import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isLogin } from "../utils/isLoggedIn";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/" />)} />
);

PrivateRoute.propTypes = {
  isLogin: PropTypes.func.isRequired,
};

export default connect(null,{isLogin})(PrivateRoute);
