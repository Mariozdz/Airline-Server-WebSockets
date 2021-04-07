import React,{Component} from "react";
import Bar from "../Components/adminBar";
import {Card} from "react-bootstrap";

class ScheduleManage extends Component{

    render() {
        return(<div>
            <Bar></Bar>
            <Card className="mx-auto" style={{width: '46rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Add Schedule</Card.Title>
                    <Card.Title className="text-center">Schedules List</Card.Title>
                    <div className="update ScheduleTable">

                    </div>
                </Card.Body>
            </Card>
        </div>);
    }

}

export default ScheduleManage;
