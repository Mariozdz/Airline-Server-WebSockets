import React,{Component} from "react";

class HeadersMaker extends  Component{
    constructor(props,data) {
        super(props);
        this.data=data;
    }

    render() {
        return(<tr>
            {this.data.map(x => (<th>x</th>))}
        </tr>);
    }

}
export default HeadersMaker;
