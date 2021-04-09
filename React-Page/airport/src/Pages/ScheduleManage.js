import React,{Component} from "react";
import Bar from "../Components/adminBar";
import {Button, Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import CustomSelect from "../Components/CustomSelect";
const client = new WebSocket("ws://localhost:8089/server/schedule");
const Week=[{day:1,name:"Monday"},{day:2,name:"Tuesday"},{day:3,name:"Wednesday"},
    {day:4,name:"Thursday"},{day:5,name:"Friday"},{day:6,name:"Saturday"},{day:7,name:"Sunday"}]



client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all_schedule'}"),100)
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

function handleRowSelect(row) {
    swal("Select Something",`What do you want to do with Schedule #${row.id}?`,{buttons: {update:"Update",delete:"Delete",cancel:"Back"}}).then(resp=>manageResp(resp,row));
}

function manageResp(resp,row){
    switch (resp){
        case "update":
            document.getElementById("scheduleAction").innerText="Update";
            document.getElementById("startday").value=row.sdate;
            document.getElementById("weekselectSch").value= Week.find(x=>x.name===row.stime).day;
            document.getElementById("rowselectid").value=row.routeid[0];
            document.getElementById("idchedule").innerText=row.id;
            break;
        case "delete":
            //delete code
            break;
        default:
    }
}

const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};

function parseCountries(lambda){
    let x=JSON.parse(sessionStorage.countries).find(lambda)
    return x.name;
}

function ParseRoute(lambda){
    let routes=JSON.parse(sessionStorage.routes);
    let route=routes.find(lambda);
    return route.id+" "+parseCountries(x=>x.id===route.origenid)+" -> "+parseCountries(x=>x.id===route.destinoid);
}

function renderScheduleTable(selectRow,options){
    let data=JSON.parse(sessionStorage.schedules);
    data.forEach(y=>y.routeid= ParseRoute(z=>z.id===y.routeid))
    data.forEach(x=>x.stime=Week.find(y=>y.day===x.stime).name);
    return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="routeid" filter={ { type: 'TextFilter', delay: 500 }}>Route info</TableHeaderColumn>
        <TableHeaderColumn dataField="sdate">Start day</TableHeaderColumn>
        <TableHeaderColumn dataField="stime" >Day</TableHeaderColumn>
    </BootstrapTable>);

}

client.onmessage = function (event) {
    let message = JSON.parse(event.data);
    if (message !== null && message !== undefined) {

        if (message.none === "none") {
            swal("Error", "Something fails", "error");
        } else {
            if (message.action === "update") {
                setTimeout(() => client.send("{Action:'get_all_schedule'}"), 100)
            } else if (message !== null) {
                sessionStorage.setItem("schedules", JSON.stringify(JSON.parse(event.data).sort((x,y)=>x.id-y.id)));
                if (document.getElementById("update ScheduleTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("update ScheduleTable"));
                    ReactDOM.render(renderScheduleTable(selectRow, options), document.getElementById("update ScheduleTable"))
                    let route=JSON.parse(sessionStorage.routes);
                    ReactDOM.render(<label>Route:<CustomSelect id="rowselectid" data={route.map(x=>({value:x.id,text:ParseRoute(y=>y.id===x.id)}))} /></label>,document.getElementById("selectedroute"))
                }
            }
        }

    }

}

function refresh(){
    document.getElementById("scheduleAction").innerText="ADD";
    document.getElementById("startday").value="";
    document.getElementById("weekselectSch").value="1";
    document.getElementById("rowselectid").value="1";
    document.getElementById("idchedule").innerText="";
}

function validateTime(s) {
    var t = s.split(':');

    return /^\d\d:\d\d$/.test(s) &&
        t[0] >= 0 && t[0] < 25 &&
        t[1] >= 0 && t[1] < 60
}

function actionschedule(){
    let time=document.getElementById("startday").value;
    if(time!==""){
        if(validateTime(time)){

            let message={
                id:document.getElementById("idchedule").innerText,
                stime:document.getElementById("weekselectSch").value,
                sdate:document.getElementById("startday").value,
                routeid:document.getElementById("rowselectid").value,
            }

            if(document.getElementById("scheduleAction").value==="ADD"){
                message.Action="create_schedule"
                setTimeout(()=>client.send(JSON.stringify(message)),100)
            }else{
                message.Action="update_schedule"
                setTimeout(()=>client.send(JSON.stringify(message)),100)
            }
        }else{
            swal("Time is invalid","Digit a valid time","info")
        }

    }else{
        swal("Time is empty","Digit a time","info")
    }



}
class ScheduleManage extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '65rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Schedules List</Card.Title>
                    <div id="update ScheduleTable">
                    </div>
                    <Card.Title className="text-center">Schedules Manage <Button onClick={refresh} variant="success">Refresh</Button></Card.Title>
                    <div className="row mx-auto">
                        <div className="col">
                            ID:<label id="idchedule"></label>
                        </div>
                        <div className="col" id="selectedroute">
                        </div>
                        <div className="col">
                            <label>start day:<input placeholder="HH:MM" id="startday"/></label>
                        </div>
                        <div className="col">
                            <label>Day of the Week:<CustomSelect id="weekselectSch" data={Week.map(x=>({value:x.day,text:x.name}))} /></label>
                        </div>
                        <div className="col"><Button onClick={actionschedule} id="scheduleAction" variant="outline-success">ADD</Button></div>
                    </div>
                </Card.Body>
            </Card>
        </div>);
    }

}

export default ScheduleManage;
