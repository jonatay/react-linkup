import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

// import { AdminUsersPage, AdminRightsPage, RootPage, NoMatch } from '../pages';
import App from '../app';
import AdminUsersPage from '../pages/admin/admin-users-page/index';
import AdminRightsPage from '../pages/admin/admin-rights-page/index';
import SignInPage from '../pages/sign-in-page/index';
import RegisterUserPage from '../pages/register-user-page/index';
import RootPage from '../pages/root-page/index';
import NoMatch from '../pages/no-match/index';

import { connect } from 'react-redux';
import {
  authActions,
  getAclFront,
  getCurrentLocation,
  getPhotoURL,
  isAuthenticated,
  navActions
} from '../../common/index';
const RequireAuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

const RequireUnauthRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return authenticated ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

const Routes = ({ authenticated }) => (
  <div>
    <Route path="/" component={App}>
      <RequireUnauthRoute
        authenticated={authenticated}
        path="/register"
        component={RegisterUserPage}
      />
      <RequireUnauthRoute
        authenticated={authenticated}
        path="/sign-in"
        component={SignInPage}
      />
      <RequireAuthRoute
        path="/admin/rights"
        authenticated={authenticated}
        component={AdminRightsPage}
      />
      <RequireAuthRoute
        path="/admin/users"
        authenticated={authenticated}
        component={AdminUsersPage}
      />
      <RequireUnauthRoute path="*" component={NoMatch} />
    </Route>
  </div>
);

const mapStateToProps = state => ({
  authenticated: isAuthenticated(state)
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
