import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./components/layout/Alert";
import Dashbord from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="create-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
          </Routes>
          <Landing />
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
