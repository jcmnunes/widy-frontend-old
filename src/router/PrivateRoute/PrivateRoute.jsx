import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authenticated) return <Component {...props} />;
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);