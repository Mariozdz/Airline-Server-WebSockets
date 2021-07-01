import React,{Component} from "react";
import Bar from "../Components/clientBar";
import {Button, Card} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import swal from "sweetalert";
import ReactDOM from "react-dom";
const Week=[{day:1,name:"Monday"},{day:2,name:"Tuesday"},{day:3,name:"Wednesday"},
    {day:4,name:"Thursday"},{day:5,name:"Friday"},{day:6,name:"Saturday"},{day:7,name:"Sunday"}]

const client = new WebSocket("ws://localhost:8089/server/flight");

const Cpurchase = new WebSocket("ws://localhost:8089/server/purchase");
purchase.onerror = function (event) {
    onError(event)
};
Cpurchase.onopen = function (event){

}
Cpurchase.onmessage= function (event){
    let state=JSON.parse(event.data)
    if(state.state==="ok"){
        swal("Successful","Your purchase has been processed","success")
    }else{
        swal("Fail","Your purchase can't be processed","error")
    }
    setTimeout( ()=> client.send("{Action:'get_all'}"),100)
    document.getElementById("origenField").value=""
    document.getElementById("destinyField").value=""
    document.getElementById("origen").checked=true
    document.getElementById("passengers").innerText="1"
    purchase.close();
}

client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all'}"),100)
}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}

client.onmessage = function (event) {
    let message = JSON.parse(event.data);
    if (message !== null && message !== undefined) {
        if (message.none === "none") {
            swal("Error", "Something fails", "error");
        } else {
            if (message.action === "update") {
                setTimeout(() => client.send("{Action:'get_all'}"), 100)
            } else if (message !== null) {
                sessionStorage.setItem("fflights", JSON.stringify(JSON.parse(event.data).filter(x=>x.disponibles>0).sort((x,y)=>x.id-y.id)));
                if (document.getElementById("flightTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("flightTable"));
                    ReactDOM.render(renderFlights(selectRow,options), document.getElementById("flightTable"));
                }
            }
        }

    }

}


function actionpassenger(msg){
    let passenger=document.getElementById("passengers").innerText;
    if(msg==="+"){
        document.getElementById("passengers").innerText=parseInt(passenger)+1
    }else{
        if(document.getElementById("passengers").innerText!=="1"){

            document.getElementById("passengers").innerText=passenger-1
        }
    }
}

const options = {
    page: 0,  // which page you want to show as default
    sizePerPageList: [ {
        text: '5', value: 5
    }, {
        text: '10', value: 10
    } ], // you can change the dropdown list for size per page
    sizePerPage: 5,  // which size per page you want to locate as default
    pageStartIndex: 0, // where to start counting the pages
    paginationSize: 2,  // the pagination bar size.
    prePage: 'Prev', // Previous page button text
    nextPage: 'Next', // Next page button text
    firstPage: 'First', // First page button text
    lastPage: 'Last', // Last page button text
    paginationShowsTotal: renderShowsTotal,  // Accept bool or function
    paginationPosition: 'bottom' ,// default is bottom, top and both is all available
    // hideSizePerPage: true > You can hide the dropdown for sizePerPage
    // alwaysShowAllBtns: true // Always show next and previous button
    // withFirstAndLast: false > Hide the going to First and Last page button
    //other options
};

function renderShowsTotal(start, to, total) {
    return (
        <p style={ { color: 'blue' } }>
            From { start } to { to }, totals is { total }
        </p>
    );
}

const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};

function handleRowSelect(row) {
    if(document.getElementById("origen").checked){
        document.getElementById("origenField").value=row.id+" "+row.origen+" -> "+row.destino
        sessionStorage.setItem("origen",row.disponibles)
        sessionStorage.setItem("destiny",row.disponibles)
    }else{
        document.getElementById("destinyField").value=row.id+" "+row.origen+" -> "+row.destino
        sessionStorage.setItem("destiny",row.disponibles)
    }
}

function renderFlights(selectRow,options){
    let data=JSON.parse(sessionStorage.fflights);
    data.forEach(x=>x.stime=Week.find(y=>y.day===x.stime).name);
    data.forEach(x=>x.isreturned==1?x.isreturned="Yes":x.isreturned="No")
    return( <BootstrapTable data={data} hover={true} search={ true } pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="origen" >Origen</TableHeaderColumn>
        <TableHeaderColumn dataField="destino" >Destination</TableHeaderColumn>
        <TableHeaderColumn dataField="isreturned" >Has Return</TableHeaderColumn>
        <TableHeaderColumn dataField="stime" >week's day</TableHeaderColumn>
        <TableHeaderColumn dataField="sdate" >Departure time</TableHeaderColumn>
        <TableHeaderColumn dataField="arrivetime" >Arrive Time</TableHeaderColumn>
        <TableHeaderColumn dataField="outbounddate">Outbound date</TableHeaderColumn>
        <TableHeaderColumn dataField="price">Ticket Price</TableHeaderColumn>
        <TableHeaderColumn dataField="disponibles" >Available seats</TableHeaderColumn>
    </BootstrapTable>);
}
function purchase(){
    if(document.getElementById("origenField").value!==""){
        let message={
            Action:"create",
            flightid: document.getElementById("origenField").value.split(" ")[0],
            userid: JSON.parse(sessionStorage.user).id,
            tickets: document.getElementById("passengers").innerText
        }
        if (document.getElementById("destinyField").value!=="")
            message.returnflightid=document.getElementById("destinyField").value.split(" ")[0]
        if(sessionStorage.origen-message.tickets>=0 &&  sessionStorage.destiny-message.tickets>=0){
            setTimeout( ()=> Cpurchase.send(JSON.stringify(message)),100)
        }else{
            swal("Fail","Your purchase has more passengers than seat of each flights","error")
        }
    }else{
        swal("Select a Origen Trip","","info")
    }
}

class Purchase extends Component{
    render(){
        return(<div>
            <Bar></Bar>
            <div className="react-bs-container">
                <div className="row">
                    <div className="col-2">
                        <Card>
                            <Card.Title className="text-center">Flights Information</Card.Title>
                            <label><input id="origen" name="trip" type="radio" checked/> Origen Trip <input id="origenField" type="text" readOnly/></label>
                            <label><input name="trip" type="radio" hidden/>  <input id="destinyField" type="text" hidden readOnly/></label>
                            <Card.Title className="text-center">Passengers</Card.Title>
                            <label>Number:<span id="passengers" className="input-group-text">1</span> </label>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" onClick={()=>actionpassenger("+")} className="btn btn-secondary">+</button>
                                <button type="button" onClick={()=>actionpassenger("-")} className="btn btn-secondary">-</button>
                            </div>
                            <Button onClick={purchase} variant="success">Purchase</Button>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Title className="text-center">Flights</Card.Title>
                            <div id="flightTable">

                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>);
    }

}

export default Purchase;
