import React,{ Component } from "react";
import {BrowserRouter  as Router,Route,Switch,Redirect} from "react-router-dom";
import NotFound from "./Pages/404";
import Login from "./Pages/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import CMenu from "./Components/clientBar";
import AMenu from "./Components/adminBar";
import NotAccess from "./Pages/acceso";
import Cprofile from "./Pages/Cprofile";
import AProfile from "./Pages/AProfile";
import CeditProfile from "./Pages/CeditProfile"
import AeditProfile from "./Pages/AeditProfile";
import signIn from  "./Pages/signIn"
import countryManage from "./Pages/countryManage";

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
            <Route exact path='/Admin'  render={ ()=> getUser()===null? (<Redirect to="/"/>): getUser().type === "admin"? (<Redirect to="/" />):(<Redirect to="/NotAccess" />) } />
            <Route exact path='/customer'  component={getUser()===null?Login:CMenu} />
            <Route exact path="/CProfile" component={getUser()===null?Login: Cprofile}/>
            <Route exact path="/AProfile" component={ getUser()===null?Login:getUser().type==="admin"? AProfile: NotAccess }/>
            <Route exact path="/CeditProfile" component={getUser()===null?Login:CeditProfile}/>
            <Route exact path="/AeditProfile" component={ getUser()===null? Login: getUser().type==="admin"?AeditProfile:NotAccess}/>
            <Route exact path="/Admin/Country" component={getUser()===null? Login: getUser().type==="admin"? countryManage:NotAccess}/>
            <Route exact path="/404" component={NotFound}/>
            <Route exact path="/Test" component={AProfile}/>
            <Route exact path="/NotAccess" component={NotAccess}/>
            <Redirect to="/404" />
          </Switch>
        </Router>);
  }
}
export default App;
