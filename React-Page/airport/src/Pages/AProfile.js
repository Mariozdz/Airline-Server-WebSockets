import React,{Component} from "react"
import Bar from "../Pages/adminBar";
import "../css/card.css"
import {Button, Card} from "react-bootstrap";

function getUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}

class Cprofile extends Component{
    render() {
        return (
            <div>
                <Bar></Bar>
                <div className="Message">
                    <Card style={{width: '18rem'}}>
                        <Card.Body>
                            <Card.Title> {getUser().id}'s Profile</Card.Title>
                            <label>Name: <input value={getUser().name} type="text" readOnly/></label>
                            <label>Surname:<input value={getUser().surnames} type="text" readOnly/></label>
                            <label>Cellphone:<input value={getUser().cellphone}  type="text" readOnly/></label>
                            <Button id="Login" onClick={()=>window.location="/"} variant="primary">Home</Button>
                            <Button id="Login" onClick={()=>window.location="/editProfile"} variant="secunday">Edit Profile</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Cprofile;
