import React,{Component} from "react"
import "../css/card.css"
import {Button}  from "react-bootstrap";
class NotFound extends Component{
    render() {
        document.body.style = 'background: rgb(53, 53, 53);'
        return (
            <div className="Message">
                <h1>
                Error 404<p>Page not Found</p>
                </h1>
                <Button onClick={()=>window.location="/"}>Home</Button>
            </div>
        );
    }


}

export default NotFound;
