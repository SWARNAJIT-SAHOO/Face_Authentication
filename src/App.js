import logo from './logo.svg';
import './App.css';

import DetailsForm from './components/DetailsForm';
import Navbarss from './components/Navbarss';
import CameraBox from './components/Camera';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home';
import PingTest from './components/PingTest';
import { useState } from 'react';
import Camera from './components/Camera';






function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
    const renderPage = () => {
      switch (currentPage) {
        case 'home':
          return <Home  setCurrentPage={setCurrentPage} />;
        case 'camera':
          return <Camera />;
        default:
          return <Home />;
      }
    };
  return (
    <div className="App">
      <Navbarss setCurrentPage={setCurrentPage} />
      {renderPage()}
   
    </div>
  );
}

export default App;
