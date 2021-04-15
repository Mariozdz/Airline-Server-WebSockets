import React,{Component} from "react";
import PlaneColumns from "./planeColumns";

class planeRows extends Component{
    render() {
        let items=[]
        let i=0
        for (let row of this.props.Rows){
            if(i!==0 && i%2===0){
                items.push(<h4>Aisle</h4>)
            }
            items.push(<PlaneColumns  ok={this.props.ok} type={this.props.type} rm={this.props.rm} Row={row} Columns={this.props.Columns}></PlaneColumns>)
            i+=1
        }
        return(
         <div className="container text-center">
             <h1>{this.props.title}</h1>
             {items}
         </div>);
    }
}

export default planeRows;
