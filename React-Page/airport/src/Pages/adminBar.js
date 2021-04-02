import React,{Component} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import swal from "sweetalert";

function getUser(){
    return JSON.parse(sessionStorage.user);
}

function close(){
    sessionStorage.removeItem("user");
    window.location="/";
}

function Logout(){
    swal("Are you sure you want close session?",{buttons:["No","Yes"]} ).then(x=> x===true ?close():"");
}

class AdminBar extends Component{
    render() {
        document.body.style = 'background: rgb(73, 73, 73);';
        return(
            <Navbar  bg="dark" variant="dark">
                <Navbar.Brand href="/">Airport Manage</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Planes</Nav.Link>
                        <Nav.Link href="#pricing">Flights</Nav.Link>
                        <Nav.Link href="#pricing">Countries</Nav.Link>
                        <Nav.Link href="#ss">Users</Nav.Link>
                        <Nav.Link href="/customer">Go to shop</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={getUser().user} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default AdminBar;
