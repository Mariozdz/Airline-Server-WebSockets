import React,{Component} from "react";
import ABar from "../Components/adminBar";
import {Card} from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import {Highcharts} from "highcharts/modules/data";
import ReactDOM from "react-dom";
import swal from "sweetalert";

const client = new WebSocket("ws://localhost:8089/server/purchase");

client.onopen = function (event){
    client.send("{Action:'GET_PURCHASE_BY_MONTH'}")
    client.send("{Action:'GET_PURCHASE_BY_YEAR'}")
}

client.onerror = function (event) {
    onError(event)
};

function onError(event){
    swal("Connection Error:"+event.data);
}


client.onmessage = function (event) {
    let options={}
    let message= JSON.parse(event.data)
    if(message.length && document.getElementById("month")){
        options.title={text:'Month Billed'}
        options.series=[{type:'column',data:message}]
        ReactDOM.unmountComponentAtNode(document.getElementById("month"))
        ReactDOM.render(<HighchartsReact highcharts={Highcharts} options={options}/>,document.getElementById("month"))
    }else if(document.getElementById("month")){
        options.title={text:'Years Earning'}
        options.series=[{type:'pie',data:[{name:`${new Date().getFullYear()}`,y:message.earnings,color:"#17b385"}]}]
        alert(JSON.stringify(options))
        ReactDOM.unmountComponentAtNode(document.getElementById("year"))
        ReactDOM.render(<HighchartsReact highcharts={Highcharts} options={options}/>,document.getElementById("year"))
    }
}


class Dashboard extends Component{

    render() {
        return(<div>
            <ABar></ABar>
            <div className="react-bs-container">
                <div className="row">
                    <div className="col">
                        <Card id="month" className="mx-auto">

                        </Card>
                    </div>
                    <div className="col">
                        <Card id="year" className="mx-auto">

                        </Card>
                    </div>
                </div>
                <div className="row">
                        <Card className="mx-auto">
                            <Card.Title>Best 5 Routes</Card.Title>
                        </Card>
                    </div>
            </div>
        </div>);
    }

}

export default Dashboard;
