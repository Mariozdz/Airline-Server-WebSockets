import React,{Component} from "react";
import {Button} from "react-bootstrap";



function PredictButton(C,R,ok,rm){
    let name="outline-success";
    if(JSON.parse(sessionStorage.tickets).find(x=>x.column===C && x.row===R))
        return <Button onClick={()=> rm(C,R)} variant="primary">{R}-{C}</Button>
    return(<Button onClick={()=> ok(C,R)} variant={name}>{R}-{C}</Button>);
}

class planeColumns extends Component{

    render(){
        return(
            <div className="row">
                {this.props.Columns.map(col=> <div className="col">{PredictButton(col,this.props.Row,this.props.ok,this.props.rm)}</div> )}
            </div>
        );
    }


}

export default planeColumns;
