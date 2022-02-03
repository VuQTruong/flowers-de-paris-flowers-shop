import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

function PrivateRoute(props) {
  const { component: Component, children, ...rest } = props;

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return (
    <Route
      {...rest}
      render={(props) => {
        const childrenWithProps = React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...props });
          }
        });

        return userInfo ? (
          Component ? (
            <Component {...props} />
          ) : (
            <React.Fragment>{childrenWithProps}</React.Fragment>
          )
        ) : (
          navigate('/signin')
        );
      }}
    />
  );
}

export default PrivateRoute;
