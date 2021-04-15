import React,{Component} from "react";
import {Button} from "react-bootstrap";

function PredictButton(C,R,ok,rm,type){

    if(JSON.parse(sessionStorage.tickets).find(x=>x.column===C && x.row===R && x.isreturn===type)){
        if (type==="0"){
            return <Button onClick={()=> rm(C,R,type)} variant="primary">{R}-{C}</Button>
        }else{
            return <Button onClick={()=> rm(C,R,type)} variant="secondary">{R}-{C}</Button>
        }
    }else if(JSON.parse(sessionStorage.ticketsSold).find(x=>x.column===C && x.row===R )){

        return(<Button variant="danger">{R}-{C}</Button>);
    }
    return(<Button onClick={()=> ok(C,R,type)} variant="outline-success">{R}-{C}</Button>);
}

class planeColumns extends Component{

    render(){
        return(
            <div className="row">
                {this.props.Columns.map(col=> <div className="col">{PredictButton(col,this.props.Row,this.props.ok,this.props.rm,this.props.type)}</div> )}
            </div>
        );
    }


}

export default planeColumns;
