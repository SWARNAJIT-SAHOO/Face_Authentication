import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PingTest() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/ping')
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResponse('Error');
      });
  }, []);

  return (
    <div>
      <h1>Ping Test</h1>
      <p>Response from Flask: {response}</p>
    </div>
  );
}

export default PingTest;
