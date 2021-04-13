import React,{Component} from "react";
import {Button} from "react-bootstrap";

function PredictButton(C,R){
    let name="outline-success";
    return(<Button variant={name}>{R}-{C}</Button>);
}

class planeColumns extends Component{

    render(){
        return(
            <div className="row">
                {this.props.Columns.map(col=> <div className="col">{PredictButton(col,this.props.Row)}</div> )}
            </div>
        );
    }


}

export default planeColumns;
