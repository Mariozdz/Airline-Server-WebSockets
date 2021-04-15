import React,{Component} from "react";
import Bar from "../Components/clientBar";
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import PlaneRows from "../Components/planeRows";
const client = new WebSocket("ws://localhost:8089/server/purchase");
sessionStorage.setItem("tickets",JSON.stringify([]))
sessionStorage.setItem("numberTickets","0")
sessionStorage.setItem("numberRTickets","0")

client.onopen = function (event){
}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}

client.onmessage = function (event){
    let message= JSON.parse(event.data)
    if(message.none==="none"){
        swal("fail","something fails","error")
    }else if(message.action==="update"){

    }else if(message.state==="ok"){
        swal("Purchase complete","","success").then(()=>window.location="http://localhost:3000/Customer/MyPurchase")

    }else if(message.id===undefined){
        alert(event.data)
        sessionStorage.setItem("ticketsSold",event.data)

    }else{

    }

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

function addTicket(column,row,isrt){

    if(isrt==="0"){
        if(JSON.parse(sessionStorage.purchase).tickets>sessionStorage.numberTickets){
            let list= JSON.parse(sessionStorage.tickets)
            list.push({column:column,row:row,isreturn:isrt})
            sessionStorage.setItem("tickets",JSON.stringify(list))
            sessionStorage.setItem("numberTickets",`${parseInt(sessionStorage.numberTickets)+1}`)

            showPlane(isrt)
        }else{
            swal("Max departure ticket","You select all your tickets","info")
        }
    }else{
        if(JSON.parse(sessionStorage.purchase).tickets>sessionStorage.numberRTickets){
            let list= JSON.parse(sessionStorage.tickets)
            list.push({column:column,row:row,isreturn:isrt})
            sessionStorage.setItem("tickets",JSON.stringify(list))
            sessionStorage.setItem("numberRTickets",`${parseInt(sessionStorage.numberRTickets)+1}`)

            showPlane(isrt)
        }else{
            swal("Max Return ticket","You select all your tickets","info")
        }
    }

}
function remove(C,R,rt){
    let list =JSON.parse(sessionStorage.tickets)
    list=list.filter(x=>x.column!==C || x.row!==R ||x.isreturn!==rt)
    sessionStorage.setItem("tickets",JSON.stringify(list))
    if (rt==="0"){
        sessionStorage.setItem("numberTickets",`${parseInt(sessionStorage.numberTickets)-1}`)
    }else{
        sessionStorage.setItem("numberRTickets",`${parseInt(sessionStorage.numberRTickets)-1}`)
    }

    showPlane(rt)
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
            ReactDOM.render( <PlaneRows rm={remove} ok={addTicket} type={rep} title="Origen" Columns={[...iterNumber(purchase.numberrow)]} Rows={[...iterNumber(purchase.numbercolums)]} />,document.getElementById("plane"))
        }else{
            if(purchase.returnflightid!=="There is not"){
                purchase=JSON.parse(sessionStorage.flights).find(x=>x.id==purchase.returnflightid[0])
                purchase=JSON.parse(sessionStorage.planes).find(x=>x.id===purchase.planeid)
                purchase=JSON.parse(sessionStorage.typeplanes).find(x=>x.id===purchase.typeplaneid)
                ReactDOM.render( <PlaneRows rm={remove} ok={addTicket} type={rep} title="Return" Columns={[...iterNumber(purchase.numberrow)]} Rows={[...iterNumber(purchase.numbercolums)]} />,document.getElementById("plane"))
            }
        }
        renderConfirm()

    }
    tickets.onerror= function (event){
        swal("error","Cant connect to flights","error");
    }



}

function SelectTickets(){
    let message={
        Action:"create_tickets",
        asientos:JSON.parse(sessionStorage.tickets),
        purchaseid:JSON.parse(sessionStorage.purchase).id
    }
    client.send(JSON.stringify(message))
}

function renderConfirm(){
    ReactDOM.unmountComponentAtNode(document.getElementById("confirm"))
    ReactDOM.render(<div className="row">
        <div className="col">
            Tickets: {renderTickets()}
        </div>
        <div className="col">
            <Button onClick={SelectTickets} variant="success">Confirm tickets</Button>
        </div>
    </div>,document.getElementById("confirm"))
}
class CheckIn extends Component{

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

export default CheckIn;
