import React,{Component} from "react";
import Bar from "../Components/clientBar";
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import PlaneRows from "../Components/planeRows";
const client = new WebSocket("ws://localhost:8089/server/purchase");

client.onopen = function (event){
}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}
function* iterNumber(num){
    let i=1
    while (i<=num){
        yield i
        i+=1
    }
}
function renderTickets(){
    let tickets=JSON.parse(sessionStorage.tickets)
    return tickets.map(x=> x.isreturn==="1"? <Button onClick={()=>remove(x.column,x.row)} variant="secondary">{x.row}-{x.column}</Button> : <Button onClick={()=>remove(x.column,x.row)} variant="primary">{x.row}-{x.column}</Button>)
}


function showPlane(rep){

}

class showSeats extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '100%'}}>
                <Card.Title className="text-center">CheckIn</Card.Title>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={()=>showPlane('0')} className="btn btn-secondary">Origen Trip</button>
                    <button type="button" onClick={()=>showPlane('1')} className="btn btn-secondary">Return Trip</button>
                </div>
                <div id="plane">

                </div>
                <Card.Title className="text-center">Information Phase</Card.Title>
                <div id="confirm">

                </div>
            </Card>
        </div>)
    }


}

export default showSeats;
