import React,{Component} from "react"
import Bar from "../Components/adminBar";
import "../css/card.css"
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
var newpass=""


function onError(event) {
    swal("Error",'An error occurred:' + JSON.stringify(event));
}

function getUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}
function exitEditProfile(){
    swal("you want cancel the current changes?",{buttons:["No","Yes"]}).then(x=>x===true? window.location="/":true);
}

 async function update(){
    if(document.getElementById("name").value!==""&&
        document.getElementById("password").value!==""&&
        document.getElementById("surname").value!==""&&
        document.getElementById("cell").value!==""&&
        document.getElementById("npassword").value!==""&&
        document.getElementById("npassword2").value!==""
    ){
        if(document.getElementById("password").value===getUser().password){
            if(document.getElementById("npassword").value===document.getElementById("npassword2").value){


                let client= await new WebSocket('ws://localhost:8089/server/user');

                function onMessage(event) {
                    let message= JSON.parse(event.data)
                    if(message.estado==="Correcto") {
                        let message= `{Action:login,id:'${getUser().id}',password:'${newpass}'}`;
                        alert(JSON.stringify(message))
                        swal("User updated", "Your user has been updated", "info").then(() => setTimeout( ()=>client.send(message),100));
                    }else if (message.state=="update"){
                        let message= `{Action:login,id:'${getUser().id}',password:'${getUser().password}'}`;
                        setTimeout( ()=>client.send(message),100);
                    }else if(message.none==="none"){
                        swal("error","User can't be updated","error");
                    }else{
                        sessionStorage.setItem("user",event.data)
                        window.location.reload()
                    }
                }

                client.onerror = function (event) {
                    onError(event)
                };
                client.onmessage = function (event) {
                    onMessage(event)
                };

                let message={
                    Action:"update",
                    id:getUser().id,
                    password:document.getElementById("npassword").value,
                    name:document.getElementById("name").value,
                    cellphone:document.getElementById("cell").value,
                    surnames:document.getElementById("surname").value,
                    longitud:12.3,
                    latitud:33.1,
                    usertype: getUser().usertype
                }
                newpass=message.password;
                alert(JSON.stringify(message))
                setTimeout( ()=> client.send(JSON.stringify(message)),1000);

            }else{
                swal("password miss match","passwords don´t be the same","error");
            }
        }else{
            swal("password incorrect","password filed don´t be your current password","error");
        }
    }else{
        swal("Empty fields","you have to should fill all fields","error");
    }

}



class CeditProfile extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <div className="Message">
                <Card className="mx-auto" style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title> {getUser().id}'s Profile</Card.Title>
                        <label>Name: <input  id="name" defaultValue={getUser().name} type="text"/></label>
                        <label>Surname:<input id="surname" defaultValue={getUser().surnames}  type="text" /></label>
                        <label>Cellphone:<input id="cell"   type="text" defaultValue={getUser().cellphone}/></label>
                        <label>Current password:<input id="password" type="password" /></label>
                        <label> New password: <input id="npassword" type="password" /></label>
                        <label> Confirm new password: <input id="npassword2" type="password"/></label>
                        <div className="row">
                            <div className="col-5">
                                <Button onClick={exitEditProfile} variant="primary">Cancel</Button>
                            </div>
                            <div className="col-5">
                                <Button onClick={update} variant="success">Update</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>)

    }


}
export default CeditProfile;
