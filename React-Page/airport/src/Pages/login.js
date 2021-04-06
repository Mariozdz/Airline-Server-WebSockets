import React,{Component} from "react"
import {Card,Button} from "react-bootstrap";
import swal from 'sweetalert';

import "../css/card.css"
import { Link } from 'react-router-dom';

function onMessage(event,client) {
        let user= JSON.parse(event.data);
        if(user.none==="none"){
            swal("Fail","Your credentials are incorrect","error");
            client.close();
        }else{
            sessionStorage.setItem("user",JSON.stringify(user));
            client.close();
            window.location="/";
        }
}

function onError(event) {
    swal("Error",'An error occurred:' + JSON.stringify(event));
}


async function login(){
    if(document.getElementById("user").value!=="" && document.getElementById("password").value!==""){
        let client = await new WebSocket('ws://localhost:8089/server/user');

        client.onerror = function (event) {
            onError(event)
        };

        client.onmessage = function (event) {
            onMessage(event,client)
        };

        let message= `{Action:login,id:'${document.getElementById("user").value}',password:'${document.getElementById("password").value}'}`;
        setTimeout( ()=>client.send(message),100);
    }else{
        swal("Digit your credentials","User and password fields can't be empty","error");
    }



}

class Login extends Component {

    render() {
        document.body.style = 'background: rgb(53, 53, 53);'

        return (
            <Card className="mx-auto" style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Login</Card.Title>
                    <label>User: <input id='user' type="text" placeholder="user"/></label>
                    <label>password:<input id='password' type="password" placeholder="********"/></label>
                    <div className="row">
                        <div className="col-6">
                            <Button id="Login" onClick={login} variant="primary">Login</Button>
                        </div>
                        <div className="col-6">
                            <Link to="/Register">Sign in</Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>);
    }
}


export default Login;
