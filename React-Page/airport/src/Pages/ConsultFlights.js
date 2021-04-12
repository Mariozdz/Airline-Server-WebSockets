import React, {Component, useLayoutEffect} from "react";
import Bar from "../Components/clientBar";
import {Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
const Week=[{day:1,name:"Monday"},{day:2,name:"Tuesday"},{day:3,name:"Wednesday"},
    {day:4,name:"Thursday"},{day:5,name:"Friday"},{day:6,name:"Saturday"},{day:7,name:"Sunday"}]

const client = new WebSocket("ws://localhost:8089/server/flight");

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
                sessionStorage.setItem("flights", JSON.stringify(JSON.parse(event.data).sort((x,y)=>x.id-y.id)));
                if (document.getElementById("Consult flightTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("Consult flightTable"));
                    ReactDOM.render(renderConsultFligths(options), document.getElementById("Consult flightTable"));
                }
            }
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



function renderConsultFligths(options){
    let data=JSON.parse(sessionStorage.flights);
    data.forEach(x=>x.stime=Week.find(y=>y.day===x.stime).name);
    return( <BootstrapTable data={data} hover={true} search={ true } pagination={ true } options={ options }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="origen" >Origen</TableHeaderColumn>
        <TableHeaderColumn dataField="destino" >Destination</TableHeaderColumn>
        <TableHeaderColumn dataField="stime" >week's day</TableHeaderColumn>
        <TableHeaderColumn dataField="sdate" >Departure time</TableHeaderColumn>
        <TableHeaderColumn dataField="arrivetime" >Arrive Time</TableHeaderColumn>
        <TableHeaderColumn dataField="outbounddate">Outbound date</TableHeaderColumn>
        <TableHeaderColumn dataField="disponibles" >Available seats</TableHeaderColumn>
    </BootstrapTable>);
}

class ConsultFlights extends Component {
    render() {
        return (<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '90%'}}>
                <Card.Body>
                    <Card.Title className="text-center">Fligth List</Card.Title>
                    <div id="Consult flightTable">

                    </div>
                </Card.Body>
            </Card>
        </div>);
    }
}

export default ConsultFlights;
