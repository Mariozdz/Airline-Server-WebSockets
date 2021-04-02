import React,{Component} from "react"
import {Card,Button} from "react-bootstrap";
import swal from 'sweetalert';
import "../css/card.css"

function onMessage(event) {
    const eventPayload = JSON.parse(event.data);
    document.getElementById('stockInformation').innerHTML +=
        `<tr><td>${eventPayload.stock}</td><td>${eventPayload.price} $</td></tr>`;
}

function onOpen(event) {
    document.getElementById('connectionMessage').innerHTML = 'Connection established';
}

function onError(event) {
    swal("Error",'An error occurred:' + event.data);
}


function prueba(){
    const webSocket = new WebSocket('ws://localhost:9080/server/user');

    webSocket.onerror = function (event) {
        onError(event)
    };
    webSocket.onopen = function (event) {
        onOpen(event)
    };
    webSocket.onmessage = function (event) {
        onMessage(event)
    };
    //Request
    let user ={
        user:"Brazza",
        name:"Braslyn",
        surnames:"Rodriguez",
        cellphone: "6003-2274",
        email:"Braslynrrr999@gmail.com",
        type:"admin"
    }
    if( document.getElementById("password").value="1")
        user.type="customer";
    //añadir al sessionStorage
    sessionStorage.setItem("user",JSON.stringify(user));

    window.location="/";
    webSocket.close();
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
                    <Button id="Login" onClick={ event => prueba()} className="btn btn-primary btn-lg">Login</Button>
                </Card.Body>
            </Card>);
    }
}


export default Login;
