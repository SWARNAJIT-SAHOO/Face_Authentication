import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav } from 'react-bootstrap';
function Navbarr() {
  return (
    <div>
    <Navbar style={{ backgroundColor: 'lightgreen' }} expand="lg">
      <Navbar.Brand href="#">BuddY</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  )
}

export default Navbarr
