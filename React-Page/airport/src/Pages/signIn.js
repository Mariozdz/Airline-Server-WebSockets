import React,{Component} from "react";
import "../css/card.css"
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
import { w3cwebsocket as W3CWebSocket } from "websocket";


function onMessage(event) {
    swal("New User","Your user has been created","info").then(()=> window.location="/");
}

function onError(event) {
    swal("Error",'An error occurred:' + JSON.stringify(event));
}

function signIn(){
    if(document.getElementById("pass").value!==""&&
        document.getElementById("npass").value!==""&&
        document.getElementById("user").value!==""&&
        document.getElementById("cell").value!==""&&
        document.getElementById("name").value!==""&&
        document.getElementById("surname").value!==""
    ){
        if(document.getElementById("pass").value===document.getElementById("npass").value){
            let client = new W3CWebSocket('ws://localhost:8089/server/user');
            client.onerror = function (event) {
                onError(event)
            };
            client.onmessage = function (event) {
                onMessage(event)
            };
            let message={
                Action:"CREATE",
                id:document.getElementById("user").value,
                password:document.getElementById("pass").value,
                name:document.getElementById("name").value,
                cellphone:document.getElementById("cell").value,
                surnames:document.getElementById("surname").value,
                longitud:12.3,
                latitud:33.1,
                usertype:1
            }
            setTimeout( ()=> client.send(JSON.stringify(message)),1000);

        }else{
            swal("password miss match","passwords don´t be the same","error");
        }
    }else{
        swal("Empty fields","you have to should fill all fields","error");
    }
}

class SignIn extends Component{

        render() {
            document.body.style = 'background: rgb(53, 53, 53);';
            return(
                <div className="Message">
                <Card className="mx-auto" style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title > Sign In </Card.Title>
                        <label>User: <input id="user" type="text" /></label>
                        <label>Name:<input id="name" type="text" /></label>
                        <label>Surname:<input id="surname" type="text" /></label>
                        <label>Cellphone:<input id="cell" type="text" /></label>
                        <label>Password:<input id="pass" type="password" /></label>
                        <label>Confirm Password:<input id="npass" type="password"/></label>
                        <div className="row">
                            <div className="col-5">
                                <Button  onClick={()=>window.location="/"} variant="outline-danger">Back</Button>
                            </div>
                            <div className="col-4">
                                <Button  onClick={signIn} variant="outline-primary">Register</Button>
                            </div>
                        </div>


                    </Card.Body>
                </Card>
            </div>

            );
        }


}
export default SignIn;
