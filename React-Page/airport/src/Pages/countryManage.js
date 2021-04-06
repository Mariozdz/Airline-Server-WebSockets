import React,{Component} from "react";
import "../css/card.css"
import Bar from "../Components/adminBar";
import {Card,Button} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import swal from 'sweetalert';
import ReactDOM from "react-dom"


const client = new WebSocket("ws://localhost:8089/server/country");


client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all'}"),100)
}

client.onerror = function (event) {
    onError(event)
};

client.onmessage = async function (event) {
    let message= JSON.parse(event.data);
    if(message.estado==="Correcto") {
        swal("Ok", "execution successful", "success")
    }else if(message.action==="update"){
        setTimeout( ()=> client.send("{Action:'get_all'}"),100)
    }else if(message.none==="none"){
        swal("fail","execution failed","error")
    }else if(message!==undefined && message!==null){
        sessionStorage.setItem("countries",JSON.stringify(message));
        if(document.getElementById("update table")!==null) {
            //document.getElementById("update table").removeChild();
            ReactDOM.render(await renderTable(selectRow,options),document.getElementById("update table"));
        }
    }

};

function onError(event){
    swal("Connection Error");
}

function handlerselect(){
    if(document.getElementById("type").value==="update"){
        document.getElementById("action").innerText="Update";
    }else{
        document.getElementById("action").innerText="Delete";
    }
}

function action(){
    let row= JSON.parse(sessionStorage.getItem("row"));
    if(row!==undefined){
        if(document.getElementById("action").innerText==="Update"){
            let message=`{Action:'update',id:'${row.id}',name:'${document.getElementById("country").value}'}`;
            setTimeout( ()=> client.send(message) ,100);
        }else{
            swal("Delete","Your country has been deleted","success");
        }
    }else{
        swal("Not selected","please select any country to continue","info");
    }

}

function addcountry(){
    if(document.getElementById("countryName").value!==""){
        setTimeout(()=>client.send("{Action:'create',name:'"+document.getElementById("countryName").value+"'}"),100);
    }else{
        swal("Empty field","you have to should write a name","info");
    }
}


async function renderTable(selectRow,options,data){
    let message=await JSON.parse(sessionStorage.getItem("countries"));
    return(<BootstrapTable id="table" hover={true} selectRow={ selectRow } data={ message } pagination={ true } options={ options }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name" filter={ { type: 'TextFilter', delay: 500 }}>Country's Name</TableHeaderColumn>
    </BootstrapTable>);
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
    paginationPosition: 'bottom'  // default is bottom, top and both is all available
    // hideSizePerPage: true > You can hide the dropdown for sizePerPage
    // alwaysShowAllBtns: true // Always show next and previous button
    // withFirstAndLast: false > Hide the going to First and Last page button
};

function renderShowsTotal(start, to, total) {
    return (
        <p style={ { color: 'blue' } }>
            From { start } to { to }, totals is { total }
        </p>
    );
}

const selectRow = {
    mode: 'radio',  // multi select
    onSelect: handleRowSelect
};

function  handleRowSelect(row) {
    sessionStorage.setItem("row",JSON.stringify(row));
    document.getElementById("country").value=row.name;
}

class countryManage extends Component{

    constructor(props) {
        super(props);
        this.data=JSON.parse(sessionStorage.countries);
    }

    render() {

     return(<div>
         <Bar></Bar>
         <Card className="mx-auto" style={{width: '36rem'}}>
         <Card.Body>
             <Card.Title className="text-center">Countries Manage</Card.Title>
             <div className="row align-items-center">
                 <div className="col">
                     <label>New country name:<input id="countryName" type="text"/></label>
                 </div>
                 <div className="col"> <Button onClick={addcountry} >Add country</Button></div>
             </div>
             <Card.Title className="text-center">Countries List -- select any to edit</Card.Title>
             <div id="update table">

             </div>
             <Card.Title className="text-center">Edit Country</Card.Title>
             <div className="row align-items-center">
                <div className="col">
                    <select id="type" onChange={handlerselect}>
                        <option value="update">Update</option>
                        <option value="delete">Delete</option>
                    </select>
                </div>
                 <div className="col">
                     <input id='country' />
                 </div>
                 <div className="col">
                     <Button variant="outline-primary" onClick={action} id="action">Update</Button>
                 </div>
             </div>
         </Card.Body>
         </Card>
     </div>)
    }
}

export default countryManage;
