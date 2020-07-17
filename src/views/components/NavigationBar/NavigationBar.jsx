//libraries
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
          </Nav>
          <Nav>
            {this.props.user.id ? (
              <>
                {this.props.user.role.id == 2 ? (
                  <Navbar.Text>
                    {this.props.user.manager.companyName}
                  </Navbar.Text>
                ) : (
                  <Navbar.Text>{this.props.user.name}</Navbar.Text>
                )}

                {this.props.user.role.id == 1 ? (
                  <LinkContainer to="/admin">
                    <Nav.Link>Dasboard</Nav.Link>
                  </LinkContainer>
                ) : null}

                {this.props.user.role.id == 2 ? (
                  <LinkContainer to="/manager">
                    <Nav.Link>Dasboard</Nav.Link>
                  </LinkContainer>
                ) : null}

                {this.props.user.role.id == 3 ? (
                  <LinkContainer to="/member">
                    <Nav.Link>Dasboard</Nav.Link>
                  </LinkContainer>
                ) : null}

                <LinkContainer to="/">
                  <Nav.Link onClick={this.logoutBtnHandler}>Keluar</Nav.Link>
                </LinkContainer>
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
