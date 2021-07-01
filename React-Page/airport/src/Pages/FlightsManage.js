import React, {Component} from "react";
import Bar from "../Components/adminBar";
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import CustomSelect from "../Components/CustomSelect";
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
                sessionStorage.setItem("flights",JSON.stringify(JSON.parse(event.data).sort((x,y)=>x.id-y.id)));

                if (document.getElementById("update flightTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("update flightTable"));
                    ReactDOM.render(renderflightsTable(selectRow, options), document.getElementById("update flightTable"));
                    ReactDOM.unmountComponentAtNode(document.getElementById("schedulecol"))
                    ReactDOM.render(<label>Schedule:<CustomSelect id="schduleid" data={ParseSchedule(JSON.parse(sessionStorage.schedules))}></CustomSelect> </label>,document.getElementById("schedulecol"))
                    ReactDOM.unmountComponentAtNode(document.getElementById("planecol"))
                    ReactDOM.render(<label>Plane:<CustomSelect id="planesid" data={ParsePlane(JSON.parse(sessionStorage.planes))}/></label>,document.getElementById("planecol"))
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

const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};

function handleRowSelect(row) {
    swal("Select Something",`What do you want to do whith type planeManage #${row.id}?`,{buttons: {cancel:"Back",update:"Update",delete:"Delete"}}).then(resp=>manageResp(resp,row));
}

function manageResp(resp,row){
    switch (resp){
        case  "update":
            if(row.disponibles!==row.cantidadasientos){
                document.getElementById("schduleid").disabled = true;
                document.getElementById("planesid").disabled = true;
            }
            document.getElementById("idflight").innerText=row.id;
            document.getElementById("schduleid").value=row.outbound;
            document.getElementById("planesid").value=row.planeid;
            document.getElementById("arrivetime").value=row.outbounddate;
            document.getElementById("actionflight").innerText="Update";
            break;
        case "delete":
            //to do
            break;
        default:
            break;

    }
}


function renderShowsTotal(start, to, total) {
    return (
        <p style={ { color: 'blue' } }>
            From { start } to { to }, totals is { total }
        </p>
    );
}
function renderflightsTable(selectRow,options){
    let data=JSON.parse(sessionStorage.flights);
    data.forEach(x=>x.stime=Week.find(y=>y.day===x.stime).name);
    data.forEach(x=>x.isreturned==1?x.isreturned="Yes":x.isreturned="No")
    return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="outbound" >Schedule ID</TableHeaderColumn>
        <TableHeaderColumn dataField="origen" filter={ { type: 'TextFilter', delay: 500 }}>Origen</TableHeaderColumn>
        <TableHeaderColumn dataField="destino" filter={ { type: 'TextFilter', delay: 500 }}>Destination</TableHeaderColumn>
        <TableHeaderColumn dataField="isreturned" >Has Return</TableHeaderColumn>
        <TableHeaderColumn dataField="stime" filter={ { type: 'TextFilter', delay: 500 }}>week's day</TableHeaderColumn>
        <TableHeaderColumn dataField="sdate" filter={ { type: 'TextFilter', delay: 500 }}>Departure time</TableHeaderColumn>
        <TableHeaderColumn dataField="arrivetime" filter={ { type: 'TextFilter', delay: 500 }}>Arrive Time</TableHeaderColumn>
        <TableHeaderColumn dataField="outbounddate" filter={ { type: 'TextFilter', delay: 500 }}>Outbound date</TableHeaderColumn>
        <TableHeaderColumn dataField="planeid" >Plane</TableHeaderColumn>
        <TableHeaderColumn dataField="cantidadasientos" >Number of seats</TableHeaderColumn>
        <TableHeaderColumn dataField="disponibles" >Current seats</TableHeaderColumn>
    </BootstrapTable>);

}
function ParseCountry(id){
    let country= JSON.parse(sessionStorage.countries).find(x=>x.id===id)
    return country.name
}

function ParseRoute(data,lambda){
    let route=data.find(lambda);
    return ParseCountry(route.origenid) +" -> "+ ParseCountry(route.destinoid)
}

function ParseSchedule(data){
    let routes=JSON.parse(sessionStorage.routes);
    return data.map(x => ({value:x.id,text:x.id+" "+ParseRoute(routes,y=>y.id===x.routeid)+" "+x.sdate}))
}

function ParseTypePlane(lambada){
    let type=JSON.parse(sessionStorage.typeplanes).find(lambada)
    return `${type.brand} ${type.model} columns:${type.numbercolums} rows:${type.numberrow}`
}

function ParsePlane(data){
    return data.map(x=>({value:x.id,text:x.id+" "+ParseTypePlane(y=>x.typeplaneid===y.id)}))
}

function refresh(){
    ReactDOM.unmountComponentAtNode(document.getElementById("schedulecol"))
    ReactDOM.render(<label>Schedule:<CustomSelect id="schduleid" data={ParseSchedule(JSON.parse(sessionStorage.schedules))}></CustomSelect> </label>,document.getElementById("schedulecol"))
    ReactDOM.unmountComponentAtNode(document.getElementById("planecol"))
    ReactDOM.render(<label>Plane:<CustomSelect id="planesid" data={ParsePlane(JSON.parse(sessionStorage.planes))}/></label>,document.getElementById("planecol"))
    document.getElementById("idflight").innerText=""
    document.getElementById("actionflight").innerText="ADD"
    document.getElementById("arrivetime").value=""

}
function validateDate(s) {
    var bits = s.split('-');
    var d = new Date(bits[0], bits[1] - 1, bits[2]);
    return d && (d.getMonth() + 1) == bits[1];
}

function Action(){
    let time=document.getElementById("arrivetime").value;
    if(time!==""){
        if (validateDate(time)){
            let message={
                id:document.getElementById("idflight").innerText,
                outboundid: document.getElementById("schduleid").value,
                outbounddate:time,
                isreturned:document.getElementById("schduleid").checked?1:0,
                planeid:document.getElementById("planesid").value
            }
            if(document.getElementById("actionflight").innerText==="ADD"){
                message.Action="create"
            }else{
                message.Action="update"
            }
            setTimeout(()=>client.send(JSON.stringify(message)),100)
        }else{
            swal("incorrect Date","input a valid date","info")
        }
    }else{
        swal("date empty","input some date","info")
    }


}


class FlightsManage extends Component{
    render() {
     return(<div>
         <Bar></Bar>
         <Card className="mx-auto" style={{width: '90%'}}>
             <Card.Body>
                 <Card.Title className="text-center">Fligth List</Card.Title>
                 <div id="update flightTable">

                 </div>
                 <Card.Title className="text-center">Fligth Manage<Button onClick={refresh} variant="success">Refresh</Button></Card.Title>
                 <div className="row mx-auto">
                     <div className="col">
                         ID:<label id="idflight"></label>
                     </div>
                     <div id="schedulecol" className="col">
                     </div>
                     <div id="planecol" className="col">

                     </div>
                     <div className="col">
                         <label>Outbound date: <input id="arrivetime" type="text" placeholder="YYYY-MM-DD"/></label>
                     </div>
                     <div className="col">
                         <label>is origin and return: <input id="oir" type="checkbox"/></label>
                     </div>
                     <div className="col"><Button onClick={Action} id="actionflight" variant="outline-success">ADD</Button></div>
                 </div>
             </Card.Body>
         </Card>
     </div>);
    }
}



export default FlightsManage;
