import React,{Component} from "react";
import "../css/card.css"
import Bar from "../Components/adminBar";
import {Card,Button} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import swal from 'sweetalert';
const client = new WebSocket("ws://localhost:8089/server/country");

client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all'}"),100)
}

client.onerror = function (event) {
    onError(event)
};

client.onmessage = function (event) {
   sessionStorage.setItem("countries",event.data);
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
            alert(message);
            setTimeout( ()=> client.send(message) ,100);
            swal("Update","Your country has been updated","success");//no va aqui
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

class countryManage extends Component{

    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
            </p>
        );
    }

    handleRowSelect(row, isSelected, e) {
        sessionStorage.setItem("row",JSON.stringify(row));
        document.getElementById("country").value=row.name;
    }

    render() {
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
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };

        const selectRow = {
            mode: 'radio',  // multi select
            onSelect: this.handleRowSelect
        };


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
             <BootstrapTable id="table" hover={true} selectRow={ selectRow } data={JSON.parse(sessionStorage.countries)} pagination={ true } options={ options }>
                 <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
                 <TableHeaderColumn dataField="name" filter={ { type: 'TextFilter', delay: 500 }}>Country's Name</TableHeaderColumn>
             </BootstrapTable>
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
