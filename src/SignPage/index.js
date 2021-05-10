import SignPage from "./SignPage.jsx"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import NormalLoginForm from "./NormalLoginForm.jsx"
import RegistrationForm from "./RegistrationForm.jsx"
import RegisterResult from "./RegisterResult"

const SignPageRoute = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/login`}>
        <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} className="sign-page" />
      </Route>
    
      <Route path={`${path}/register/result`}>
        <SignPage formLable="注 册 结 果" render={<RegisterResult />} />
      </Route>
    
      <Route path={`${path}/register`}>
        <SignPage formLable="注 册 账 户" render={<RegistrationForm />} />
      </Route>
    
      <Route path={`${path}/`}>  
        <SignPage formLable="欢 迎 登 录" render={<NormalLoginForm />} />
      </Route>
    </Switch>
  )
}

export default SignPageRoute;