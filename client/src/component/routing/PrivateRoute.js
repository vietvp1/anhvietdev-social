import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({history, component: Component, ...rest}) => {
  if (!localStorage.token) {
    history.push('/sign-in');
  }
  const {isAuthenticated, loading} = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/sign-in'/>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default withRouter(PrivateRoute);
