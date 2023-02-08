import React from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Cookie from 'js-cookie';

export default function NavigationBar() {

    const logOut = async () => {
      Cookie.remove("auth");
    }

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ECHO Website</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/panel">Panel</Nav.Link>
            <Nav.Link href="/" onClick={logOut}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}