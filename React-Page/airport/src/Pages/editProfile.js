import React,{Component} from "react"
import Bar from "../Pages/clientBar";
import "../css/card.css"
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const countries=[
    {ID:"1",
    country:"CR"},{ID:"2",
    country:"MX"}]

class CeditProfile extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <BootstrapTable data={countries}>
                <TableHeaderColumn dataField="ID" isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="country">Country</TableHeaderColumn>
            </BootstrapTable>
        </div>)

    }


}
export default CeditProfile;
