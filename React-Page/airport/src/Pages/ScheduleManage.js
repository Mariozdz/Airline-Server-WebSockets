import React,{Component} from "react";
import Bar from "../Components/adminBar";
import {Card} from "react-bootstrap";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
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
    //swal("Select Something",`What do you want to do whith type planeManage #${row.id}?`,{buttons:["Update","Delete"]}).then(resp=>manageResp(resp,row));
}

const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};

function renderScheduleTable(selectRow,options){
    let data=JSON.parse(sessionStorage.schedules);
    data.forEach(x=>x.stime=Week.find(y=>y.day===x.stime).name);
    return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="routeid" filter={ { type: 'TextFilter', delay: 500 }}>Route ID</TableHeaderColumn>
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
                sessionStorage.setItem("schedules", event.data);
                if (document.getElementById("update ScheduleTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("update ScheduleTable"));
                    ReactDOM.render(renderScheduleTable(selectRow, options), document.getElementById("update ScheduleTable"))
                }
            }
        }

    }

}

class ScheduleManage extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '46rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Schedules List</Card.Title>
                    <div id="update ScheduleTable">
                    </div>
                </Card.Body>
            </Card>
        </div>);
    }

}

export default ScheduleManage;
