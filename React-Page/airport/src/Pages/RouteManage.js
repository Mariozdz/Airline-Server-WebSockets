import React,{Component} from "react";
import Bar from "../Components/adminBar";
import {Button, Card} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import swal from "sweetalert";
import CustomSelect from "../Components/CustomSelect";


function renderRouteTable(selectRow,options){
    let data=[{id:"1",origen:"CR",destination:"MX",duration:"3",price:"600",discount:"3"}]
    return( <BootstrapTable data={data} hover={true}  pagination={ true } options={ options } selectRow={ selectRow }>
        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="origen" filter={ { type: 'TextFilter', delay: 500 }}>Origen</TableHeaderColumn>
        <TableHeaderColumn dataField="destination" filter={ { type: 'TextFilter', delay: 500 }}>Destination</TableHeaderColumn>
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
    //swal("Select Something",`What do you want to do whith type planeManage #${row.id}?`,{buttons:["Update","Delete"]}).then(resp=>manageResp(resp,row));
}
function parceCountries(countries){
    let out=countries.map(ele=>({value:ele.id,text:ele.name}));
    return out;
}

class RouteManage extends Component{
    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '46rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Route List</Card.Title>
                    <div className="update RouteTable">
                        {renderRouteTable(selectRow,options)}
                    </div>
                    <Card.Title className="text-center">Update Route<Button variant="success">Refresh</Button></Card.Title>
                    <div className="row mx-auto">
                        <div className="col">
                            <label>ID: <input type="text"/></label>
                        </div>
                        <div className="col">
                            <label>Origin from: <CustomSelect id="originE" data={parceCountries(JSON.parse(sessionStorage.countries))} /></label>
                        </div>
                        <div className="col">
                            <label>Destination to: <CustomSelect id="destinationE" data={parceCountries(JSON.parse(sessionStorage.countries))} /></label>
                        </div>
                    </div>
                    <div  className="row">
                        <div className="col">
                            <label>Duration  : <input /></label>
                        </div>
                        <div className="col">
                            <label>Price  : <input /></label>
                        </div>
                        <div className="col">
                            <label>Discount: <input /></label>
                        </div>
                        <div className="row mx-auto"><Button variant="outline-primary">Update</Button></div>
                    </div>
                </Card.Body>
            </Card>
        </div>);
    }
}

export default RouteManage;
