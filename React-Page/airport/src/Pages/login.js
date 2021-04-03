import React,{Component} from "react"
import {Card,Button} from "react-bootstrap";
import swal from 'sweetalert';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../css/card.css"

function onMessage(event,client) {
        sessionStorage.setItem("user",event.data);
        client.close();
        window.location="/";
}

function onError(event) {
    swal("Error",'An error occurred:' + JSON.stringify(event));
}


async function prueba(){
    let client = new W3CWebSocket('ws://localhost:8089/server/user');

    client.onerror = function (event) {
        onError(event)
    };

    client.onmessage = function (event) {
        onMessage(event,client)
    };

     let message=`{Action:login,id:'${document.getElementById("user").value}',password:'${document.getElementById("password").value}'}`;
     setTimeout( ()=>client.send(message),10);

}

class Login extends Component {

    render() {
        document.body.style = 'background: rgb(53, 53, 53);'

        return (
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <label>User: <input id='user' type="text" placeholder="user"/></label>
                    <label>password:<input id='password' type="password" placeholder="********"/></label>
                    <Button id="Login" onClick={prueba} className="btn btn-primary btn-lg">Login</Button>
                </Card.Body>
            </Card>);
    }
}


export default Login;
