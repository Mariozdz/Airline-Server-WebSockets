import React,{Component} from "react";
import Bar from "../Components/clientBar";
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import PlaneRows from "../Components/planeRows";
const client = new WebSocket("ws://localhost:8089/server/purchase");

client.onopen = function (event){
    let purchase1= JSON.parse(sessionStorage.purchase)
    let message=`{Action:"GET_TICKETS_BYPURCHASE",purchaseid:"${purchase1.id}"}`
    client.send(message);
}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}



client.onmessage =function (event){
     sessionStorage.setItem("tickets",event.data)
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
    return tickets.map(x=> x.isreturn===1? <Button variant="secondary">{x.srow}-{x.scolum}</Button> : <Button variant="primary">{x.srow}-{x.scolum}</Button>)
}


function showPlane(rep){
    let purchase=JSON.parse(sessionStorage.purchase)
    const tickets= new WebSocket("ws://localhost:8089/server/flight")
    tickets.onopen = function (event) {
        let purchase=JSON.parse(sessionStorage.purchase)
        let flight= JSON.parse(sessionStorage.flights).find(x=>rep==="0"?x.id==purchase.flightid.split(" ")[0]:x.id==purchase.returnflightid.split(" ")[0])
        if(flight!=undefined){
            let message=`{Action:"GET_ACQUIRED_FIELDS",flightid:"${flight.id}"}`
            tickets.send(message);
        }else{
            swal("Not return trip","There is not a return trip","info")
        }

    }

    tickets.onmessage= function (event){
        sessionStorage.setItem("ticketsSold",event.data)
        ReactDOM.unmountComponentAtNode(document.getElementById("plane"));
        if (rep==='0'){
            purchase=JSON.parse(sessionStorage.flights).find(x=>x.id==purchase.flightid[0])
            purchase=JSON.parse(sessionStorage.planes).find(x=>x.id===purchase.planeid)
            purchase=JSON.parse(sessionStorage.typeplanes).find(x=>x.id===purchase.typeplaneid)
            ReactDOM.render( <PlaneRows type={rep} title="Origen" Columns={[...iterNumber(purchase.numberrow)]} Rows={[...iterNumber(purchase.numbercolums)]} />,document.getElementById("plane"))
        }else{
            if(purchase.returnflightid!=="There is not"){
                purchase=JSON.parse(sessionStorage.flights).find(x=>x.id==purchase.returnflightid[0])
                purchase=JSON.parse(sessionStorage.planes).find(x=>x.id===purchase.planeid)
                purchase=JSON.parse(sessionStorage.typeplanes).find(x=>x.id===purchase.typeplaneid)
                ReactDOM.render( <PlaneRows type={rep} title="Return" Columns={[...iterNumber(purchase.numberrow)]} Rows={[...iterNumber(purchase.numbercolums)]} />,document.getElementById("plane"))
            }
        }
        renderConfirm()
    }
    tickets.onerror= function (event){
        swal("error","Cant connect to flights","error");
    }
}

function renderConfirm(){
    ReactDOM.unmountComponentAtNode(document.getElementById("confirm"))
    ReactDOM.render(<div className="row">
        <div className="col">
            Tickets: {renderTickets()}
        </div>
    </div>,document.getElementById("confirm"))
}

class showSeats extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '100%'}}>
                <Card.Title className="text-center">Show seat</Card.Title>
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
