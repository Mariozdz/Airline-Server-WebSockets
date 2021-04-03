import React,{Component} from "react"
import Bar from "../Pages/clientBar";
import "../css/card.css"
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
function getUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}
function exitEditProfile(){
    swal("you want cancel the current changes?",{buttons:["No","Yes"]});

    window.location="/"
}

class CeditProfile extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <div className="Message">
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title> {getUser().id}'s Profile</Card.Title>
                        <label>Name: <input value={getUser().name} type="text" /></label>
                        <label>Surname:<input value={getUser().surnames} type="text" /></label>
                        <label>Cellphone:<input value={getUser().cellphone}  type="text" /></label>
                        <label>Current password:<input type="password" /></label>
                        <label> New password: <input type="password" /></label>
                        <label> Confirm new password: <input type="password"/></label>
                        <Button onClick={exitEditProfile} variant="primary">Cancel</Button>
                        <Button variant="success">Update</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>)

    }


}
export default CeditProfile;
