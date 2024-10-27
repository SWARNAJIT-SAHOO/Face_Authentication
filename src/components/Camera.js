import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Adharcard from "./AadharCard";
import axios from 'axios';
import ws from './dp.jpg'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
function Camera() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [image1, setImage1] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  

  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);
  const dataURL=null;
  
  const todatabse=()=>{
   setShowForm(true);

   fetch(dataURL)
   .then(res => res.blob())
   .then(blob => {
     const formData = new FormData();
     formData.append('file', blob, 'captured-image.png');

     // Send the image data to the Spring Boot API
     fetch('http://localhost:8080/check', {
       method: 'POST',
       body: formData,
      })
    //  .then(response => response.json())
    .then(data => console.log('Success:', data))
     .catch(error => console.error('Error:', error));
   });
   
   
  }


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

  const [capturedImage, setCapturedImage] = useState(null);
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCapturedImage(reader.result);
          setImage1(blob); // Set the captured image as image1 for comparison
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
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






  //upload image and check
  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const [data1,setdata1]=useState([]);
  const handleCompare = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image1', image1);
    // formData.append('image2', image2);

    try {
      const response = await axios.post('http://localhost:5000/compare', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        console.log(response.data);
        setResult(response.data);
        setError(null);
setLoading(false);
        setShowForm(true);
      } else {
        setError('Unexpected response structure');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error uploading images:', error);
      setError('Error comparing images');
    }
  };




  
  const [loading, setLoading] = useState(false);



  return (
    <>
    <Box style={{width:"100%"}}>
      {loading && (
        <Box >
         <LinearProgress color="success" />
        </Box>
      )}
      
    </Box>
    <Container className="d-flex align-items-center justify-content-center vh-100"> 
      <Row className="w-100">
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <div style={{ width: '100%', height: '0', paddingBottom: '66.67%', backgroundColor: 'black', border: '5px solid lightgreen', borderRadius: '1rem', position: 'relative' }}>
            <video ref={videoRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '1rem' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
          <div id="comparisonResult"></div>
<div id="errorMessage"></div>

        </Col>
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">
          <Button variant="primary" className="mb-2" style={{ fontSize: '1rem', padding: '8px 10px', marginBottom: '0.5rem', width: '80%' }} onClick={startCamera}>Turn on Camera</Button>
          <Button variant="primary" className="mb-2" style={{ fontSize: '1rem', padding: '8px 10px', marginBottom: '0.5rem', width: '80%' }} onClick={captureImage}>Capture</Button>
          <Button variant="primary"  className="mb-2" style={{ fontSize: '1rem', padding: '8px 10px', marginBottom: '0.5rem', width: '80%' , position:'relative'}}>
            <input type="file" style={{opacity:'0' , position:'absolute',width:'100%',bottom:'1%',top:'1%',left:'1%'}} onChange={handleImage1Change}  ></input>
            <p >Choose Your File
              </p>
          </Button>
          <Button variant="danger" className="mb-2" style={{ fontSize: '2rem', padding: '25px 20px', marginBottom: '0.5rem', width: '80%' }} onClick={handleCompare} >AuthentiCate
     <img src='https://cdn-icons-png.flaticon.com/512/5067/5067582.png ' style={{width:'20%'}}></img>

          </Button>
        </Col>
      </Row>

      <Modal show={showForm}  onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
      
        <Modal.Body >
          {
            result!=null?
            <div className="card">
            <div className="header">
              <img />
              <div className="title">My Identity, My Pride</div>
            </div><br></br>
            <div className="text-center">
              <img src={`http://localhost:5000/image/${result.id}`} alt="Matched" style={{height:"12rem",border:'.04cm solid black'}}/>
            </div>
            <br></br>
            <br></br>
            <div className="details">
              {/* <p><strong>Name:</strong> {result.name}</p> */}
              <p><strong>Occupation:</strong> {result.occupation}</p>
              <p><strong>Age:</strong> {result.age}</p>
              <p><strong>PhoneNumber:</strong> {result.phonenumber}</p>
            </div>
           
            <div className="footer">
              <p><strong> {result.name}</strong> </p>
            </div>
          </div>:0
          }
       
        {/* <Adharcard /> */}
        </Modal.Body>
        
      </Modal>
    </Container>
          </>
  );
}

export default Camera;