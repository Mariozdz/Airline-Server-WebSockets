import React,{Component} from "react"
import {Card,Button} from "react-bootstrap";


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


function onMessage(event) {
    const eventPayload = JSON.parse(event.data);
    document.getElementById('stockInformation').innerHTML +=
        `<tr><td>${eventPayload.stock}</td><td>${eventPayload.price} $</td></tr>`;
}

function onOpen(event) {
    document.getElementById('connectionMessage').innerHTML = 'Connection established';
}

function onError(event) {
    alert('An error occurred:' + event.data);
}

function send() {
    const info = {
        'stock':"x",
        'price': "y"
    };

    webSocket.send(JSON.stringify(info));
}

class Login extends Component {

    render() {
        document.body.style = 'background: rgb(53, 53, 53);'

        return (
            <Card style={{width: '18rem', left: '40%', marginTop: '10%'}}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <label>User: <input id='user' type="text" placeholder="user"/></label>
                    <label>password:<input id='password' type="password" placeholder="********"/></label>
                    <Button id="Login" className="btn btn-primary btn-lg">Login</Button>
                </Card.Body>
            </Card>);
    }
}


export default Login;
