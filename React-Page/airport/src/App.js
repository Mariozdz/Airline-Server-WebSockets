import React,{ Component } from "react";
import {BrowserRouter  as Router,Route,Switch,Redirect} from "react-router-dom";
import NotFound from "./Pages/404";
import Login from "./Pages/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import CMenu from "./Pages/clientBar";
import AMenu from "./Pages/adminBar";
import NotAccess from "./Pages/acceso";
import Cprofile from "./Pages/Cprofile";
import CeditProfile from "./Pages/CeditProfile"
import signIn from  "./Pages/signIn"

function getUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}

class App extends Component{

  render() {

    return(
        <Router>
          <Switch>
            <Route exact path="/" component={  getUser()===null? Login : getUser().type==="admin"? AMenu : CMenu } />
            <Route exact path="/Register" component={ getUser()===null? signIn : CMenu } />
            <Route exact path='/Admin'  render={ ()=> getUser().type === "admin"? (<Redirect to="/" />):(<Redirect to="/access" />) } />
            <Route exact path='/customer'  component={CMenu} />
            <Route exact path="/CProfile" component={Cprofile}/>
            <Route exact path="/CeditProfile" component={CeditProfile}/>
            <Route exact path="/404" component={NotFound}/>
            <Route exact path="/NotAccess" component={NotAccess}/>
            <Redirect to="/404" />
          </Switch>
        </Router>);
  }
}
export default App;
