import React,{ Component } from "react";
import {BrowserRouter  as Router,Route,Switch,Redirect} from "react-router-dom";
import NotFound from "./Pages/404";
import Login from "./Pages/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import CMenu from "./Components/clientBar";
import AMenu from "./Components/adminBar";
import NotAccess from "./Pages/acceso";
import Cprofile from "./Pages/Cprofile";
import AProfile from "./Pages/AProfile";
import CeditProfile from "./Pages/CeditProfile"
import AeditProfile from "./Pages/AeditProfile";
import signIn from  "./Pages/signIn"
import countryManage from "./Pages/countryManage";
import typeplane from "./Pages/typeManage";
import planeManage from "./Pages/planeManage";
import FlightsManage from "./Pages/FlightsManage";
import ScheduleManage from "./Pages/ScheduleManage";
import RouteManage from "./Pages/RouteManage";
import ConsultFlights from "./Pages/ConsultFlights";
import Purchase from "./Pages/Purchase";
import MyPurchase from "./Pages/myPurchase";
import CheckIn from "./Pages/CheckIn";
import showSeats from "./Pages/ShowSeats";
function getUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}

class App extends Component{

  render() {

    return(
        <Router>
          <Switch>
            <Route exact path="/" component={  getUser()===null? Login : getUser().usertype===0? AMenu : CMenu } />
            <Route exact path="/Register" component={ getUser()===null? signIn : CMenu } />
            <Route exact path='/Admin'  render={ ()=> getUser()===null? (<Redirect to="/"/>): getUser().usertype === 0? (<Redirect to="/" />):(<Redirect to="/NotAccess" />) } />
            <Route exact path='/customer'  component={getUser()===null?Login:CMenu} />
            <Route exact path="/Customer/Flights" component={getUser()===null?Login: ConsultFlights}/>
            <Route exact path="/Customer/Purchase" component={getUser()===null?Login: Purchase}/>
            <Route exact path="/Customer/MyPurchase" component={getUser()===null?Login: MyPurchase}/>
            <Route exact path="/Customer/MyPurchase/CheckIn" component={getUser()===null?Login:CheckIn}/>
            <Route exact path="/Customer/MyPurchase/ShowSeats" component={getUser()===null?Login:showSeats}/>
            <Route exact path="/CProfile" component={getUser()===null?Login: Cprofile}/>
            <Route exact path="/AProfile" component={ getUser()===null?Login:getUser().usertype===0? AProfile: NotAccess }/>
            <Route exact path="/CeditProfile" component={getUser()===null?Login:CeditProfile}/>
            <Route exact path="/AeditProfile" component={ getUser()===null? Login: getUser().usertype===0?AeditProfile:NotAccess}/>
            <Route exact path="/Admin/Country" component={getUser()===null? Login: getUser().usertype===0? countryManage:NotAccess}/>
            <Route exact path="/Admin/Plane/Type" component={getUser()===null? Login: getUser().usertype===0? typeplane:NotAccess}/>
            <Route exact path="/Admin/Plane/Plane" component={getUser()===null? Login: getUser().usertype===0? planeManage:NotAccess}/>
            <Route exact path="/Admin/Flights/Flights" component={getUser()===null? Login: getUser().usertype===0? FlightsManage:NotAccess}/>
            <Route exact path="/Admin/Flights/Route" component={getUser()===null? Login: getUser().usertype===0? RouteManage:NotAccess}/>
            <Route exact path="/Admin/Flights/Schedule" component={getUser()===null? Login: getUser().usertype===0? ScheduleManage:NotAccess}/>
            <Route exact path="/404" component={NotFound}/>
            <Route exact path="/Test" component={AProfile}/>
            <Route exact path="/NotAccess" component={NotAccess}/>
            <Redirect to="/404" />
          </Switch>
        </Router>);
  }
}
export default App;
