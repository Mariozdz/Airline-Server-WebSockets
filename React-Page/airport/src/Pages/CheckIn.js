import React,{Component} from "react";
import Bar from "../Components/clientBar";
import {Button, Card, Container} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import PlaneRows from "../Components/planeRows";
const client = new WebSocket("ws://localhost:8089/server/purchase");
sessionStorage.setItem("tickets",JSON.stringify([]))
sessionStorage.setItem("numberTickets","0")

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
    return tickets.map(x=> <Button onClick={()=>remove(x.column,x.row)} variant="primary">{x.row}-{x.column}</Button>)
}

function addTicket(column,row){
    if(JSON.parse(sessionStorage.purchase).tickets>sessionStorage.numberTickets){
        let list= JSON.parse(sessionStorage.tickets)
        list.push({column:column,row:row})
        sessionStorage.setItem("tickets",JSON.stringify(list))
        sessionStorage.setItem("numberTickets",`${parseInt(sessionStorage.numberTickets)+1}`)
        showPlane("O")
    }else{
        swal("Max ticket","You select all your tickets","info")
    }
}
function remove(C,R){
    let list =JSON.parse(sessionStorage.tickets)
    list=list.filter(x=>x.column!==C || x.row!==R)
    sessionStorage.setItem("tickets",JSON.stringify(list))
    sessionStorage.setItem("numberTickets",`${parseInt(sessionStorage.numberTickets)-1}`)
    showPlane('O')
}

function showPlane(rep){
    let purchase=JSON.parse(sessionStorage.purchase)
    ReactDOM.unmountComponentAtNode(document.getElementById("plane"));
    if (rep==='O'){
        purchase=JSON.parse(sessionStorage.flights).find(x=>x.id==purchase.flightid[0])
        purchase=JSON.parse(sessionStorage.planes).find(x=>x.id===purchase.planeid)
        purchase=JSON.parse(sessionStorage.typeplanes).find(x=>x.id===purchase.typeplaneid)
        ReactDOM.render( <PlaneRows rm={remove} ok={addTicket} title="Origen" Columns={[...iterNumber(purchase.numberrow)]} Rows={[...iterNumber(purchase.numbercolums)]} />,document.getElementById("plane"))
    }else{

    }
    renderConfirm()

}

function renderConfirm(){
    ReactDOM.unmountComponentAtNode(document.getElementById("confirm"))
    ReactDOM.render(<div className="row">
        <div className="col">
            Tickets: {renderTickets()}
        </div>
        <div className="col">
            <Button variant="success">Confirm tickets</Button>
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
                <button type="button" onClick={()=>showPlane('O')} className="btn btn-secondary">Origen Trip</button>
                <button type="button" onClick={()=>showPlane('D')} className="btn btn-secondary">Return Trip</button>
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
