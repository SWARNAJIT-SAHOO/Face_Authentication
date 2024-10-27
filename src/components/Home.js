import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';

function Home({ setCurrentPage }) {
  
  return (
    <div>

    

      <section className="bg-light text-dark text-center py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="my-3">
              <h1>Secure Your Identity with Face Recognition</h1>
              <p className="lead">Advanced biometric authentication for a safer world.</p>
              <Button variant="primary" onClick={() => setCurrentPage('camera')} size="lg">Get Started</Button>
            </Col>
            <Col md={6} className="my-3">
            {/* <SlideShow/> */}
              <img src="https://recfaces.com/wp-content/uploads/2020/11/960x0.png" alt="Face Recognition" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h4>Face Recognition</h4>
                <p>State-of-the-art facial recognition technology for secure authentication.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h4>Biometric Authentication</h4>
                <p>Multi-factor biometric authentication for enhanced security.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h4>Easy Integration</h4>
                <p>Simple integration with your existing systems and applications.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <Container>
          <p>&copy; 2023 FaceRecg. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
