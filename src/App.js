import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Sidebar from './sidebar';

import {BrowserRouter as Router, Route,Routes, Link, Switch} from 'react-router-dom'

function App() {
  return (
    
    <>
       
      <div className='grid-container'>
       
           <Header />
            <Sidebar />
            <Home />
      </div>
          {/* <Router>
           
            <Routes>
              <Route path="/group" element={<Group/>} />
            </Routes>
          </Router> */}
    </>
  );
}

export default App;
