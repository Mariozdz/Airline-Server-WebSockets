import React,{Component} from "react"
import Bar from "../Components/clientBar";
import "../css/card.css"
import {Button, Card} from "react-bootstrap";
import gMap from "../Components/Map";
function getUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}

class Cprofile extends Component{
    render() {
        return (
            <div>
                <Bar></Bar>
                <div className="Message">
                    <Card className="mx-auto" style={{width: '18rem'}}>
                        <Card.Body>
                            <Card.Title> {getUser().id}'s Profile</Card.Title>
                            <label>Name: <input value={getUser().name} type="text" readOnly/></label>
                            <label>Surname:<input value={getUser().surnames} type="text" readOnly/></label>
                            <label>Cellphone:<input value={getUser().cellphone}  type="text" readOnly/></label>
                            <Button  onClick={()=>window.location="/"} variant="primary">Home</Button>
                            <Button  onClick={()=>window.location="/CeditProfile"} variant="secunday">Edit Profile</Button>

                        </Card.Body>
                    </Card>
                </div>
                <gMap></gMap>
            </div>
        );
    }
}

export default Cprofile;
