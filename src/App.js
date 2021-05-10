import React from "react";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  // Router,
  Switch,
  Route,
} from "react-router-dom";
// import SignPage from "./SignPage/SignPage.jsx"
// import SignPage from "./SignPage"
// import RegisterResult from "./SignPage/RegisterResult"
// import TodoListPage from "./TodoListPage/TodoListPage.jsx"
import TodoListPage from "./TodoListPage"
import SignPageRoute from "./SignPage"
// import NormalLoginForm from "./SignPage/NormalLoginForm.jsx"
// import RegistrationForm from "./SignPage/RegistrationForm.jsx"
import "./App.less"


function App() {

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/login">
            <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} className="sign-page" />
          </Route>

          <Route path="/register/result">
            <SignPage formLable="注 册 结 果" render={<RegisterResult />} />
          </Route>

          <Route path="/register">
            <SignPage formLable="注 册 账 户" render={<RegistrationForm />} />
          </Route> */}
          
          <Route exact path="/">
            <SignPageRoute />
          </Route>

          <Route path="/todolist">
            <TodoListPage id="todolist-page" />
          </Route>

          {/* <Route path="/">  
            <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} />
          </Route> */}
        </Switch>
      </div>
    </Router>
  )
}

export default App;