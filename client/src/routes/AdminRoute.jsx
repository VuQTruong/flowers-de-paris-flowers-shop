import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

function AdminRoute(props) {
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

        return userInfo && userInfo.isAdmin ? (
          Component ? (
            <Component />
          ) : (
            <React.Fragment>{childrenWithProps}</React.Fragment>
          )
        ) : (
          navigate('/')
        );
      }}
    />
  );
}

export default AdminRoute;
