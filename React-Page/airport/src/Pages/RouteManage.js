import React,{Component} from "react";
import Bar from "../Components/adminBar";
import {Button, Card} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import swal from "sweetalert";
import CustomSelect from "../Components/CustomSelect";
import ReactDOM from "react-dom";
const client = new WebSocket("ws://localhost:8089/server/schedule");

client.onopen = function (event){
    setTimeout( ()=> client.send("{Action:'get_all_route'}"),100)
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
                setTimeout(() => client.send("{Action:'get_all_route'}"), 100)
            } else if (message !== null) {
                sessionStorage.setItem("routes", event.data);
                if (document.getElementById("update RouteTable") !== null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("update RouteTable"));
                    ReactDOM.render(renderRouteTable(selectRow, options), document.getElementById("update RouteTable"))
                }
            }
        }

    }

}

function parseRoute(data){
    data.forEach(x =>{x.price="$"+x.price;x.origenid=parseCountries(y=>y.id===x.origenid);x.destinoid=parseCountries(y=>y.id===x.destinoid);})
    return data;
}
function parseCountries(lambda){
    let x=JSON.parse(sessionStorage.countries).find(lambda)
    return x.name;
}
function renderRouteTable(selectRow,options){
    let data= parseRoute(JSON.parse(sessionStorage.routes))
    return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="origenid" filter={ { type: 'TextFilter', delay: 500 }}>Origen</TableHeaderColumn>
        <TableHeaderColumn dataField="destinoid" filter={ { type: 'TextFilter', delay: 500 }}>Destination</TableHeaderColumn>
        <TableHeaderColumn dataField="duration">Duration</TableHeaderColumn>
        <TableHeaderColumn dataField="price" >Price</TableHeaderColumn>
        <TableHeaderColumn dataField="discount" >Discount</TableHeaderColumn>
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
    paginationPosition: 'bottom' ,// default is bottom, top and both is all available
    // hideSizePerPage: true > You can hide the dropdown for sizePerPage
    // alwaysShowAllBtns: true // Always show next and previous button
    // withFirstAndLast: false > Hide the going to First and Last page button
    //other options
};

function renderShowsTotal(start, to, total) {
    return (
        <p style={ { color: 'blue' } }>
            From { start } to { to }, totals is { total }
        </p>
    );
}


const selectRow = {
    mode: 'radio',
    onSelect: handleRowSelect
};

function handleRowSelect(row) {
    swal("Select Something",`What do you want to do whith route #${row.id}?`,{buttons:["Delete","Update"]}).then(resp=>manageRouteResp(resp,row));
}

function manageRouteResp(resp,row){
    if(resp) {//update
        document.getElementById("routeid").style.display="block";
        let countries=JSON.parse(sessionStorage.countries);
        document.getElementById("routeid").readOnly=true;
        document.getElementById("routeid").innerText=row.id;
        document.getElementById("duration").value=row.duration;
        document.getElementById("price").value=row.price;
        document.getElementById("discount").value=row.discount;
        document.getElementById("originR").value=countries.find(x=>x.name===row.origenid).id;
        document.getElementById("destinationR").value=countries.find(x=>x.name===row.destinoid).id;
        document.getElementById("actionRoute").innerText="Update";
    }else{//delete

    }

}

function parceCountries(countries){
    let out=countries.map(ele=>({value:ele.id,text:ele.name}));
    return out;
}


function refresh(){
    let countries=JSON.parse(sessionStorage.countries);
    document.getElementById("routeid").style.display="none";
    document.getElementById("routeid").innerText="";
    document.getElementById("duration").value="";
    document.getElementById("price").value="";
    document.getElementById("discount").value="";
    document.getElementById("actionRoute").innerText="ADD";
    document.getElementById("originR").value=countries[0].id;
    document.getElementById("destinationR").value=countries[0].id;
}

function excecuteRoute(){
    let price=document.getElementById("price").value;
    let message= {
        id:document.getElementById("routeid").innerText,
        duration:document.getElementById("duration").value,
        price:price[0]==="$"? price.slice(1):price,
        discount:document.getElementById("discount").value,
        origenid:document.getElementById("originR").value,
        destinoid:document.getElementById("destinationR").value
    }
    if(document.getElementById("actionRoute").innerText==="ADD"){
        message.Action="create_route";
        setTimeout( ()=> client.send(JSON.stringify(message)) , 100)
    }else{
        message.Action="update_route";
        setTimeout( ()=> client.send(JSON.stringify(message)) , 100)
    }
}

class RouteManage extends Component{
    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '46rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Route List</Card.Title>
                    <div id="update RouteTable">

                    </div>
                    <Card.Title className="text-center">Update Route<Button onClick={refresh} variant="success">Refresh</Button></Card.Title>
                    <div className="row mx-auto">
                        <div className="col">
                            ID:<label id="routeid"></label>
                        </div>
                        <div className="col">
                            <label>Origin from: <CustomSelect id="originR" data={parceCountries(JSON.parse(sessionStorage.countries))} /></label>
                        </div>
                        <div className="col">
                            <label>Destination to: <CustomSelect id="destinationR" data={parceCountries(JSON.parse(sessionStorage.countries))} /></label>
                        </div>
                    </div>
                    <div  className="row">
                        <div className="col">
                            <label>Duration: <input id="duration"/></label>
                        </div>
                        <div className="col">
                            <label>Price: <input id="price"/></label>
                        </div>
                        <div className="col">
                            <label>Discount: <input id="discount"/></label>
                        </div>
                        <div className="row mx-auto"><Button onClick={excecuteRoute} id="actionRoute" variant="outline-primary">ADD</Button></div>
                    </div>
                </Card.Body>
            </Card>
        </div>);
    }
}

export default RouteManage;
