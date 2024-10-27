import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button,Container, Modal } from 'react-bootstrap';
import DetailsForm from './DetailsForm';
import Home from './Home';

function Navbarss({ setCurrentPage }) {
  const [showForm, setShowForm] = useState(false);
  
  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  return (
    <div>
   

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" onClick={() => setCurrentPage('camera')} >FaceRecg</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => setCurrentPage('home')} >Home</Nav.Link>
              <Nav.Link >Features</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
              <div style={{textAlign:"right"}}>

              <Button variant="outline-light" className="ml-2" onClick={handleShow}>Register</Button>
              </div>
        </Container>
      </Navbar>
      <Modal show={showForm}  onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>Details Form</Modal.Title>
        </Modal.Header>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Modal.Body >
          <DetailsForm />
        </Modal.Body>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Modal>
    </div>
  );
}

export default Navbarss;