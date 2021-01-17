import React, { useState } from "react";
import NavbarComponent from "./Navbar";
import SignIn from "./SignIn";
import ListTasks from "./ListTasks";
import { Redirect, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem("login") ? (
            children
          ) : (
            <Redirect
              exact
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className="App">
      <NavbarComponent />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <SignIn history={props.history} />}
        />
        <PrivateRoute path="/list-tasks">
          <ListTasks />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
