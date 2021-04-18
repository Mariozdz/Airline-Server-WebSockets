import React,{Component} from "react";
import ABar from "../Components/adminBar";
import {Button, Card} from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import {Highcharts} from "highcharts/modules/data";
import ReactDOM from "react-dom";
import swal from "sweetalert";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
const colors=[{id:1,color:"#a9890d"},{id:2,color:"#188c27"},{id:3,color:"#ac0a0a"},{id:5,color:"#3e3e43"},
    {id:4,color:"#2a43de"},{id:5,color:"#000000"},{id:5,color:"#13e9cf"},{id:5,color:"#482403"},{id:5,color:"#5e03b3"}]
const client = new WebSocket("ws://localhost:8089/server/purchase");

client.onopen = function (event){
    client.send("{Action:'GET_PURCHASE_BY_MONTH'}")
    client.send("{Action:'GET_PURCHASE_BY_YEAR'}")
    client.send("{Action:'GET_FIRST_FIVE'}")
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


const table = {
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

function renderPassengers(){
    return( <BootstrapTable data={[]}  pagination={ true } options={ table }  search={ true }>
        <TableHeaderColumn dataField="id" isKey>Fligth ID</TableHeaderColumn>
        <TableHeaderColumn dataField="user" >User</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Full Name</TableHeaderColumn>
        <TableHeaderColumn dataField="tickets">Tickets</TableHeaderColumn>
    </BootstrapTable>);
}


client.onmessage = function (event) {
    let options={}
    let html=""
    //alert(event.data)
    let message= JSON.parse(event.data)

    if(document.getElementById("year")){
        if(message.length){
            if(message[0].routeid){
                html="5routes"
                options.title={text:'Best 5 Routes'}
                message= message.sort((x,y)=>x.total-y.total)
                message=message.map(x=>({name:"ID:"+x.routeid+" "+x.origin+" -> "+x.destination,y:x.total,color:colors[Math.floor(Math.random() * colors.length)].color}))
                options.series=[{type:'bar',data:message}]
            }else if(message[0].color){
                html="month"
                options.title={text:'Month Billed'}
                options.series=[{type:'column',data:message}]
            }else{
                html="passengersTable"
                //tabla
            }
        }else if(message.earnings!==undefined){
            html="year"
            options.title={text:'Years Earning'}
            options.series=[{type:'pie',data:[{name:`${new Date().getFullYear()}`,y:message.earnings,color:"#17b385"}]}]
        }
        ReactDOM.unmountComponentAtNode(document.getElementById(html))
        ReactDOM.render(<HighchartsReact highcharts={Highcharts} options={options}/>,document.getElementById(html))
    }

}


class Dashboard extends Component{

    render() {
        return(<div>
            <ABar></ABar>
            <div className="react-bs-container">
                <div className="row">
                    <div className="col">
                        <Card id="month" className="mx-auto"></Card>
                    </div>
                    <div className="col">
                        <Card id="year" className="mx-auto"></Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Card id="5routes" className="mx-auto"></Card>
                    </div>
                    <div className="col">
                        <Card id="LPassengers" className="mx-auto">
                            <Card.Title className="text-center">Passengers List</Card.Title>
                            <div className="container">
                                <div className="row">
                                    <div className="col"><label>Digit Flight id:</label></div>
                                    <div className="col"><input type="text" placeholder="Flight id"/></div>
                                    <div className="col"><Button variant="outline-success">Get Passengers List</Button> </div>
                                </div>
                            </div>
                            <div id="passengersTable">
                                {renderPassengers()}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>);
    }

}

export default Dashboard;
