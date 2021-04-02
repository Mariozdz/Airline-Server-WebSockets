import React,{Component} from "react"
import "../css/card.css"

class NotAccess extends Component{
    render() {
        return (
            <div className="Message">
                <h1> You don't have access to browse in this page </h1>
            </div>
        );
    }
}

export default NotAccess;
