import React,{Component} from "react";
import "../css/card.css"
import Bar from "../Components/adminBar";
import {Card,Button} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import swal from 'sweetalert';
import ReactDOM from "react-dom"

const client = new WebSocket("ws://localhost:8089/server/plane");


client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all_typeplane'}"),100)
}

client.onerror = function (event) {
    onError(event)
};

client.onmessage = function (event) {
    let message=JSON.parse(event.data);
    if(message!==null && message!==undefined){

        if(message.none==="none"){
            swal("Error","Something fails","error");
        }else{
            if(message.action==="update"){
                swal("Excecution successfull","","success");
                setTimeout( ()=> client.send("{Action:'get_all_typeplane'}"),100)
            }else if(message[0]!==null){
                if(message[0].brand!==undefined)
                    sessionStorage.setItem("typeplanes", event.data);
                if (document.getElementById("update typetable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("update typetable"));
                    ReactDOM.render(renderTypeTable(selectRow, options), document.getElementById("update typetable"))
                }
            }
        }

    }
};

function onError(event){
    swal("Connection Error:"+event.data);
}

const  cellEditProp = {
    mode: 'dbclick'
};


function onAfterInsertRow(row) {
    let newRowStr = '';

    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
    alert('The new row is:\n ' + newRowStr);
}

function handleRowSelect(row) {
     swal("TypePlane selected",`What do you want to do whith type plane #${row.id}?`,{buttons:{cancel:"Back",update:"Update",delete:"Delete"}}).then(resp=>manageResp(resp,row));
}

function manageResp(Resp,row){
    switch (Resp){
        case "update":
            row.Action="update_type";
            setTimeout(()=>client.send(JSON.stringify(row)),100);
            break;
        case "delete":
            swal("deleted","element deleted","success");
            break;
        default:
    }
}
function addType(){
    if(document.getElementById("brand").value!==""&&
        document.getElementById("model").value!==""&&
        document.getElementById("columns").value!==""&&
        document.getElementById("rows").value!==""){

        if(document.getElementById("rows").validationMessage===""&&document.getElementById("rows").validationMessage===""){
                let message={
                    Action:"create_type",
                    brand:document.getElementById("brand").value,
                    model:document.getElementById("model").value,
                    Numbercolums:document.getElementById("columns").value,
                    Numberrow:document.getElementById("rows").value
                }
                setTimeout( ()=> client.send(JSON.stringify(message)) ,100);
        }else{
            swal("Error","Min or Max of a rows/colums don't apply","info");
        }
    }else{
        swal("Error","Please Fill all the Fields","info");
    }
}




function renderTypeTable(selecRow,options){
    let data=JSON.parse(sessionStorage.getItem("typeplanes"));
   return( <BootstrapTable data={data} hover={true} cellEdit={ cellEditProp } pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="brand" filter={ { type: 'TextFilter', delay: 500 }}>Brand</TableHeaderColumn>
        <TableHeaderColumn dataField="model"filter={ { type: 'TextFilter', delay: 500 }}>Model</TableHeaderColumn>
        <TableHeaderColumn dataField="numbercolums" filter={ { type: 'TextFilter', delay: 500 }}>Number of columns</TableHeaderColumn>
        <TableHeaderColumn dataField="numberrow" filter={ { type: 'TextFilter', delay: 500 }}>Number of rows</TableHeaderColumn>
    </BootstrapTable>);
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
    afterInsertRow: onAfterInsertRow
};

const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};


class typeplane extends Component{


    render() {


        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '45rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Plane Types</Card.Title>
                    <div id="update typetable">

                    </div>
                    <Card.Title className="text-center">Add Plane Types</Card.Title>
                    <div className="row mx-auto">
                        <div className="col">
                            <label>Brand :</label>
                        </div>
                        <div className="col">
                            <input type="text" id="brand"/>
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className="col">
                            <label>Model:</label>
                        </div>
                        <div className="col">
                            <input type="text"  id="model"/>
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className="col">
                            <label>Number of Columns</label>
                        </div>
                        <div className="col">
                            <input type="number" onInput= { ()=> document.getElementById("columns").value=document.getElementById("columns").value.replace(/[^0-9]/g, '')} min="1" max="6" id="columns"/>
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className="col">
                            <label >Number of Rows</label>
                        </div>
                        <div className="col">
                            <input type="number" onInput ={ ()=> document.getElementById("rows").value=document.getElementById("rows").value.replace(/[^0-9]/g, '')} min="1" max="50" id="rows" />
                        </div>
                    </div>
                    <div className="row mx-auto">
                        <div className="col">
                            <label>Action:</label>
                        </div>
                        <div className="col">
                            <Button onClick={addType} variant="success">Add new type</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>)
    }

}


export default typeplane;
