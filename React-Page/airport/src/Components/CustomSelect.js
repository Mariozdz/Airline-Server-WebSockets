import React,{Component} from "react";
import "../css/card.css";

class CustomSelect extends Component{

    render() {
        return<select id={this.props.id}>
            {this.props.data.map(element => <option value={element.value}>{element.text}</option>)}
        </select>

    }
}
export default CustomSelect;
