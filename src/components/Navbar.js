import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import DetailsForm from './DeatilsForm';

function Navbarr() {
  const [showForm, setShowForm] = useState(false);

  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

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
          <div className="ml-auto d-flex align-items-center">
            <Button variant="primary" onClick={handleShow}>Upload Details</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showForm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Details Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetailsForm />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Navbarr;
