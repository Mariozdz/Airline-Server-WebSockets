import React,{Component} from "react";
import "../css/card.css"
import Bar from "../Components/adminBar";
import {Card,Button} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import swal from 'sweetalert';

import CustomSelect from "../Components/CustomSelect";

const  cellEditProp = {
    mode: 'dbclick'
};


function handleRowSelect(row) {
    //swal("Select Something",`What do you want to do whith type plane #${row.id}?`,{buttons:{cancel:"Back",update:"Update",delete:"Delete"}}).then(resp=>manageResp(resp,row));
}

class plane extends Component{

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
        };

        const selectRow = {
            mode: 'radio',
            onSelect: handleRowSelect
        };


        return (<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '45rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Plane Types</Card.Title>
                    <BootstrapTable data={[{id:"0",type:"1"}]} hover={true} cellEdit={ cellEditProp } pagination={ true } options={ options } selectRow={ selectRow }>
                        <TableHeaderColumn dataField="id" isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="type" filter={ { type: 'TextFilter', delay: 500 }}>Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="description" filter={ { type: 'TextFilter', delay: 500 }}>Description</TableHeaderColumn>
                    </BootstrapTable>
                    <Card.Title className="text-center">Add Plane </Card.Title>
                        <div className="row mx-auto">
                            <div className="col"> <label >ID:<input type="text"/></label> </div>
                            <div className="col"> <label>Type:<CustomSelect id="type" data={[{value:"1",text:"2 boing wea"},{value:"2",text:"1 boing wea3"}]}/></label> </div>
                            <div className="col"><label>Action  :
                            <Button variant="success">Add</Button></label>
                            </div>
                        </div>
                </Card.Body>
            </Card>

        </div>);

    }


}
export default plane;
