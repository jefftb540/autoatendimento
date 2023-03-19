import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{ pathname: '/admin/login', state: { prevPath: '/admin/' } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,

};
