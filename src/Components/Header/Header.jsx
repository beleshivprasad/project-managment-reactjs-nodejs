import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <i className="fas fa-code fa-lg"></i> Web-Dev Trainings
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/dashboard/project">
              Projects
            </NavLink>
            <NavLink className="nav-link" to="/dashboard/features">
              Features
            </NavLink>
            <NavLink className="nav-link" to="/dashboard/about">
              About
            </NavLink>
          </Nav>
          {isLogged ? (
            <>
              <Nav>
                <NavDropdown
                  title="Shivprasad Bele"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <i className="fas fa-user-circle"></i> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="">
                <NavLink className="nav-link" to="/user/login">
                  <i className="fas fa-sign-out-alt"></i> Login
                </NavLink>
                <NavLink className="nav-link" to="/user/login">
                  Register
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
