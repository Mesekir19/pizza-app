// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// // Protected route to ensure user is authenticated
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//       }
//     />
//   );
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

// Protect a route and redirect to login if user is not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  //   const isAuthenticated = !!localStorage.getItem("token");
console.log("Is Authenticated: ", isAuthenticated);
console.log("Token from LocalStorage: ", localStorage.getItem("token"));

  if (loading) return <p>Loading...</p>; // Optionally show a loading state while checking auth

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
