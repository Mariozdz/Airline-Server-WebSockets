import React,{ Component } from "react";
import {BrowserRouter  as Router,Route,Switch,Redirect} from "react-router-dom";
import NotFound from "./Pages/404";
import Login from "./Pages/login";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component{

  render() {

    return(
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>);
  }
}
export default App;
