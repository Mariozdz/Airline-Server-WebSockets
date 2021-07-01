import React,{Component} from "react";
import Bar from "../Components/clientBar";
import { Card} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import swal from "sweetalert";
import ReactDOM from "react-dom";

const client = new WebSocket("ws://localhost:8089/server/purchase");

client.onopen = function (event){
    if(sessionStorage.user!==undefined)
        setTimeout( ()=> client.send(`{ Action:"get_by_user",userid:"${JSON.parse(sessionStorage.user).id}" }`),1000)
}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}

function renderShowsTotal(start, to, total) {
    return (
        <p style={ { color: 'blue' } }>
            From { start } to { to }, totals is { total }
        </p>
    );
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


function ManageRep(resp,row){
    sessionStorage.setItem("purchase",JSON.stringify(row))
    if (resp){
        if(row.isselected==="Yes"){
            window.location="/Customer/MyPurchase/ShowSeats";
        }else{
            window.location="/Customer/MyPurchase/CheckIn";
        }
    }
}

function handleRowSelect(row) {
    if(row.isselected==="Yes"){
        swal("Ticket","do you want see your seats","info",{buttons:["Back","Show seats"]}).then(x=>ManageRep(x,row))
    }else{
        swal("Ticket","do you want Choose your seats","info",{buttons:["Back","Choose seats"]}).then(x=>ManageRep(x,row))
    }

}

const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};

client.onmessage = function (event) {
    let message = JSON.parse(event.data);
    if (message !== null && message !== undefined) {
        if (message.none === "none") {
            swal("Error", "Something fails", "error");
        } else {
            if (message.action === "update") {
                setTimeout(() => client.send(`{Action:'get_by_user',userid:"${JSON.parse(sessionStorage.user).id}"}`), 100)
            } else if (message !== null) {
                sessionStorage.setItem("purchases", JSON.stringify(JSON.parse(event.data).sort((x,y)=>x.id-y.id)));
                if (document.getElementById("purchaseTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("purchaseTable"));
                    ReactDOM.render(renderPurchases(selectRow,options), document.getElementById("purchaseTable"));
                }
            }
        }

    }
}

function parseFlight(id){
    let flight =JSON.parse( sessionStorage.flights ).find(x=>x.id===id);
    if(id!=="0" && flight!==undefined){
        return `${flight.id} ${flight.origen} -> ${flight.destino}`
    }else{
        return "There is not";
    }

}


function parsePurchase(data){

    data.forEach(x=> x.flightid= parseFlight(x.flightid))
    data.forEach(x=> x.returnflightid=parseFlight(x.returnflightid))
}

function renderPurchases(selectRow,options){
    let data=JSON.parse(sessionStorage.purchases)
    parsePurchase(data)
    data.forEach(x=> x.isselected= x.isselected===false?"No":"Yes")
    data.forEach(x=>x.isreturned===1?x.isreturned="Yes":x.isreturned="No")
    return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } search={ true } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="flightid" >Origin trip</TableHeaderColumn>
        <TableHeaderColumn dataField="isreturned">Has Return</TableHeaderColumn>
        <TableHeaderColumn dataField="tickets">Tickets</TableHeaderColumn>
        <TableHeaderColumn dataField="totalprice" >Total cost</TableHeaderColumn>
        <TableHeaderColumn dataField="isselected">are seats selected</TableHeaderColumn>
    </BootstrapTable>);
}

class MyPurchase extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '70%'}}>
                <Card.Title className="text-center">My purchases</Card.Title>
                <div id="purchaseTable">

                </div>
            </Card>
        </div>)
    }


}
export default MyPurchase;
