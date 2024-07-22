import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function CameraBox() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(videoStream);
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    // Event listeners for stopping camera when tab is changed or window is minimized
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      }
    };

    const handleWindowBlur = () => {
      stopCamera();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      // Cleanup event listeners and stream
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      stopCamera();
    };
  }, [stream]);

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100"> 
      <Row className="w-100">
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <div style={{ width: '100%', height: '0', paddingBottom: '66.67%', backgroundColor: 'black', border: '5px solid lightgreen', borderRadius: '1rem', position: 'relative' }}>
            <video ref={videoRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '1rem' }}></video>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">
          <Button variant="primary" className="mb-2" style={{ fontSize: '2rem', padding: '15px 20px',marginBottom:'0.5rem', width: '80%' }} onClick={startCamera}>Turn on Camera</Button>
          <Button variant="primary" style={{ fontSize: '2rem', padding: '15px 20px',marginBottom:'0.5rem', width: '80%' }}>Upload Image</Button>
          <Button variant="primary" style={{ fontSize: '2rem', padding: '15px 20px',marginBottom:'0.5rem', width: '80%' }}>Capture</Button>
          <Button variant="primary" style={{ fontSize: '2rem', padding: '15px 20px',marginBottom:'0.5rem', width: '80%' }}>Choose a File</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CameraBox;
