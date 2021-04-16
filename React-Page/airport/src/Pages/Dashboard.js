import React,{Component} from "react";
import ABar from "../Components/adminBar";
import {Card} from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import {Highcharts} from "highcharts/modules/data";

const options2 = {
    title: {
        text: 'Billed Monthly'
    },
    series: [{
        type: 'column',
        data: [{name:"January",y:900,color:'#3498db'},{name:"February",y:800,color:'#f1c40f'}]
    }]
}

const options = {
    title: {
        text: 'Billed Monthly'
    },
    series: [{
        type: 'pie',
        data: [{name:"January",y:900,color:'#3498db'},{name:"February",y:800,color:'#f1c40f'}]
    }]
}

class Dashboard extends Component{

    render() {
        return(<div>
            <ABar></ABar>
            <div className="react-bs-container">
                <div className="row">
                    <div className="col">
                        <Card className="mx-auto">
                            <HighchartsReact highcharts={Highcharts} options={options}/>
                        </Card>
                    </div>
                    <div className="col">
                        <Card className="mx-auto">
                            <HighchartsReact highcharts={Highcharts} options={options2}/>
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
