import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  routeType,
  loggedIn,
  redirectPath = "/",
  children,
}) => {
  if (routeType === 1) {
    if (loggedIn === true) {
      return <Navigate to="/welcome" replace />;
    }

    return children ? children : <Outlet />;
  }
  if (routeType === 2) {
    if (loggedIn === false) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  }
};
export default ProtectedRoute;
