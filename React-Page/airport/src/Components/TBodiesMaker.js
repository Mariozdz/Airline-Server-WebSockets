import React,{Component} from "react";

class TBodiesMaker extends  Component{
    constructor(props,data,buttons,id) {
        super(props);
        this.data=data;
        this.buttons=buttons;
        this.id=id;
    }

    render() {
        return(
            <tbody id={this.id}>
                { this.data.map(x=><tr>

            </tr>)}

            </tbody>

        );
    }

}
export default TBodiesMaker;
