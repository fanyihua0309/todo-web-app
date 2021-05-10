import React from "react";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignPageRoute from "./SignPage"
import TodoListPage from "./TodoListPage"
import "./App.less"


function App() {

  return (
    <Router>
      <div>
        <Switch>
          
          <Route path="/sign">
            <SignPageRoute />
          </Route>

          <Route path="/todolist">
            <TodoListPage />
          </Route>

          <Redirect to="/sign" />

        </Switch>
      </div>
    </Router>
  )
}

export default App;