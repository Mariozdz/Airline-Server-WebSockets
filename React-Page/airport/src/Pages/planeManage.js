import React,{Component} from "react";
import "../css/card.css"
import Bar from "../Components/adminBar";
import {Card,Button} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import swal from 'sweetalert';
import CustomSelect from "../Components/CustomSelect";
import ReactDOM from "react-dom";


const client = new WebSocket("ws://localhost:8089/server/plane");


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
                //swal("Excecution successfull", "", "success");
                setTimeout(() => client.send("{Action:'get_all'}"), 100)
            } else if (message !== null) {
                sessionStorage.setItem("planes", event.data);
                if (document.getElementById("update planetable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("update planetable"));
                    ReactDOM.render(renderPlaneTable(selectRow, options), document.getElementById("update planetable"))
                }
            }
        }

    }

}
function handleRowSelect(row) {
    swal("Select Something",`What do you want to do whith type planeManage #${row.id}?`,{buttons:["Update","Delete"]}).then(resp=>manageResp(resp,row));
}

function manageResp(resp,row){
    if(resp){
        //send delete
    }else{
        document.getElementById("idplane").value=row.id;
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


function renderShowsTotal(start, to, total) {
    return (
        <p style={ { color: 'blue' } }>
            From { start } to { to }, totals is { total }
        </p>
    );
}


function ParceText(data,id){
   let list=JSON.parse(sessionStorage.typeplanes);
   let out=data.map(ele=>{
      let obj=list.find(x=>x.id===ele.typeplaneid);
       return {id:ele.id,typeplaneid:obj.model+" "+obj.brand+" col: "+obj.numbercolums+" row: "+obj.numberrow}
   });
   return out;
}

function renderPlaneTable(selectRow,options){
    let data=ParceText(JSON.parse(sessionStorage.planes));
   return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="typeplaneid" filter={ { type: 'TextFilter', delay: 500 }}>Type</TableHeaderColumn>
    </BootstrapTable>);
}


class planeManage extends Component{
    parcetypes(data){
        let out=data.map(ele=>({value:ele.id,text:ele.model+" "+ele.brand+" col: "+ele.numbercolums+" row:"+ele.numberrow}))
        return out;
    }

    render() {

        return (<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '36rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Add Plane </Card.Title>
                        <div className="row mx-auto">
                            <div className="col" > <label>Type:<CustomSelect id="typeplanef" data={this.parcetypes(JSON.parse(sessionStorage.typeplanes))}/></label> </div>
                            <div className="col">
                            <Button onClick={()=>setTimeout(()=>client.send(`{Action:"create",typeplaneid:"${document.getElementById("typeplanef").value}"}`),100)} variant="success">Add</Button>
                            </div>
                        </div>
                    <Card.Title className="text-center">Plane Types</Card.Title>
                    <div id="update planetable">

                    </div>
                    <Card.Title className="text-center"> Plane Selected </Card.Title>
                    <div className="row mx-auto">
                        <div className="col"> <label >ID:<input id="idplane" type="text" readOnly/></label> </div>
                        <div className="col" > <label>Type:<CustomSelect id="typeplanes" data={this.parcetypes(JSON.parse(sessionStorage.typeplanes))}/></label> </div>
                        <div className="col" >
                            <Button onClick={()=>setTimeout(()=>client.send(`{Action:"update",id:"${document.getElementById("idplane").value}",typeplaneid:"${document.getElementById("typeplanes").value}"}`),100)} variant="outline-success">Update</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </div>);

    }


}
export default planeManage;
