import React,{Component} from "react";
import Bar from "../Components/clientBar";
import {Button, Card, Container} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import swal from "sweetalert";
import ReactDOM from "react-dom";
import PlaneRows from "../Components/planeRows";
const client = new WebSocket("ws://localhost:8089/server/purchase");

client.onopen = function (event){

}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}

function* iterNumber(num){
    let i=1
    while (i<=num){
        yield i
        i+=1
    }
}
function showPlane(rep){
    let purchase=JSON.parse(sessionStorage.purchase)
    ReactDOM.unmountComponentAtNode(document.getElementById("plane"));
    if (rep==='O'){
        purchase=JSON.parse(sessionStorage.flights).find(x=>x.id==purchase.flightid[0])
        purchase=JSON.parse(sessionStorage.planes).find(x=>x.id===purchase.planeid)
        purchase=JSON.parse(sessionStorage.typeplanes).find(x=>x.id===purchase.typeplaneid)
        ReactDOM.render( <PlaneRows title="Origen" Columns={[...iterNumber(purchase.numberrow)]} Rows={[...iterNumber(purchase.numbercolums)]} />,document.getElementById("plane"))
    }else{

    }
}


class CheckIn extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '100%'}}>
                <Card.Title className="text-center">CheckIn</Card.Title>
                <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={()=>showPlane('O')} className="btn btn-secondary">Origen Trip</button>
                <button type="button" onClick={()=>showPlane('D')} className="btn btn-secondary">Destination Trip</button>
                </div>
                <div id="plane">

                </div>
            </Card>
        </div>)
    }


}

export default CheckIn;
