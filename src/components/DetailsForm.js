import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


function DetailsForm() {
  const [photoError, setPhotoError] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phonenumber: '',
    age: '',
    occupation: '',
    file: null,
    fingerprint: null,
  });


  const captureFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setFormData({ ...formData, fingerprint: result.visitorId });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const photo = form.elements.formPhoto.files[0];

    if (photo && photo.size > 5 * 1024 * 1024) {
      setPhotoError('Photo size should be less than 5 MB');
      return;
    }

    setPhotoError('');
    // Handle form submission

    event.preventDefault();
    const data = new FormData();
    // if(formData.fingerprint==null){
    //   alert("null");
    // }
    // else{
    //   alert("done");
    // }
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('phonenumber', formData.phonenumber);
    data.append('age', formData.age);
    data.append('occupation', formData.occupation);
    data.append('file', formData.file);
    data.append('fingerprint', new Blob([formData.fingerprint], { type: 'application/octet-stream' }));


    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        
        alert('Data uploaded successfully');
      } else {
        alert('Data upload failed');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data');
    }


  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div
        style={{
          backgroundColor: '#C0C0C0',
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          width: '100%',
          
        }}
      >
        <h2 className="mb-4">Details Form</h2>
        <Form  onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"  name="name" onChange={handleChange} placeholder="Enter your name" />
          </Form.Group>
<br></br>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"name="email" onChange={handleChange} placeholder="Enter your email" />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number"name="age"onChange={handleChange}  placeholder="Enter your age" />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text"name="address"onChange={handleChange} placeholder="Enter your address" />
          </Form.Group>

          <br></br>
          <Form.Group controlId="formOccupation">
            <Form.Label>PhoneNumber</Form.Label>
            <Form.Control type="number" name="phonenumber"onChange={handleChange} placeholder="Enter your PhoneNumber" />
          </Form.Group>
          <br></br>

          <Form.Group controlId="formOccupation">
            <Form.Label>Occupation</Form.Label>
            <Form.Control type="text"name="occupation"onChange={handleChange} placeholder="Enter your occupation" />
          </Form.Group>
          <br></br>

          <Form.Group controlId="formPhoto">
            <Form.Label>Your Photo</Form.Label>
            <Form.Control type="file" name="file" onChange={handleFileChange} accept="image/*" />
          </Form.Group>

          {photoError && <Alert variant="danger">{photoError}</Alert>}
          <br></br>

          <Form.Group controlId="formOccupation">
            <Form.Label>FingerPrint</Form.Label>
            <button name="fingerprint" type='button' onClick={captureFingerprint}>
              <img src='https://www.svgrepo.com/show/5105/fingerprint.svg' style={{width:'20%'}}></img>
            </button>
           
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default DetailsForm;
