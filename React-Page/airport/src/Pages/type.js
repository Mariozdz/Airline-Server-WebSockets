import React,{Component} from "react";
import "../css/card.css"
import Bar from "../Components/adminBar";
import {Card,Button} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import swal from 'sweetalert';


const client = new WebSocket("ws://localhost:8089/server/typeplane");


client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all'}"),100)
}

client.onerror = function (event) {
    onError(event)
};

client.onmessage = function (event) {
    let data = [{
        id:"1",
        brand:"patito",
        model: "avec3",
        numbercolums:"3",
        numberrow:"6"
    }]
    sessionStorage.setItem("typeplanes",JSON.stringify(data));
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
     swal("Select Something",`What do you want to do whith type plane #${row.id}?`,{buttons:{cancel:"Back",update:"Update",delete:"Delete"}}).then(resp=>manageResp(resp,row));
}

function manageResp(Resp,row){
    switch (Resp){
        case "Update":
            row.Action="update";
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
                    Action:"create",
                    brand:document.getElementById("brand").value,
                    model:document.getElementById("model").value,
                    Numbercolums:document.getElementById("columns").value,
                    Numberrow:document.getElementById("rows").value
                }
                alert("send");
                setTimeout( ()=> client.send(JSON.stringify(message)) ,100);
        }else{
            swal("Error","Min or Max of a rows/colums don't apply","info");
        }
    }else{
        swal("Error","Please Fill all the Fields","info");
    }
}

class typeplane extends Component{

    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }
            </p>
        );
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

        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '45rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Plane Types</Card.Title>
                    <BootstrapTable data={JSON.parse(sessionStorage.typeplanes)} hover={true} cellEdit={ cellEditProp } pagination={ true } options={ options } selectRow={ selectRow }>
                        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="brand" filter={ { type: 'TextFilter', delay: 500 }}>Brand</TableHeaderColumn>
                        <TableHeaderColumn dataField="model"filter={ { type: 'TextFilter', delay: 500 }}>Model</TableHeaderColumn>
                        <TableHeaderColumn dataField="numbercolums" filter={ { type: 'TextFilter', delay: 500 }}>Number of columns</TableHeaderColumn>
                        <TableHeaderColumn dataField="numberrow" filter={ { type: 'TextFilter', delay: 500 }}>Number of rows</TableHeaderColumn>
                    </BootstrapTable>
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
