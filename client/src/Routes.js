import React from "react";
import Dashboard from "./components/Dashboard";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import PrivateRoute from "./authentication/PrivateRoute";

function Routes(props) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={props => <Login {...props} />} />
          <Route
            path="/registration"
            render={props => <Register {...props} />}
          />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
