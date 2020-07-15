//libraries
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler } from "../../../redux/actions";

class NavigationBar extends React.Component {
  logoutBtnHandler = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <LinkContainer to="/">
          <Navbar.Brand>OctoFund</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/product">
              <Nav.Link>Produk</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/package">
              <Nav.Link>Paket</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {this.props.user.id ? (
              <>
                <Navbar.Text>{this.props.user.email}</Navbar.Text>
                <Nav.Link onClick={this.logoutBtnHandler}>Keluar</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/register">
                  <Nav.Link>Daftar</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Masuk</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onLogout: logoutHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
