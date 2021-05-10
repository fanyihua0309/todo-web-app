import SignPage from "./SignPage.jsx"
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom"
import NormalLoginForm from "./NormalLoginForm.jsx"
import RegistrationForm from "./RegistrationForm.jsx"
import RegisterResult from "./RegisterResult"

const SignPageRoute = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/in`}>
        <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} className="sign-page" />
      </Route>

      <Route exact path={`${path}/up`}>
        <SignPage formLable="注 册 账 户" render={<RegistrationForm />} />
      </Route>
    
      <Route path={`${path}/up/result`}>
        <SignPage formLable="注 册 结 果" render={<RegisterResult />} />
      </Route>

      <Redirect to={`${path}/in`} />
    
    </Switch>
  )
}

export default SignPageRoute;