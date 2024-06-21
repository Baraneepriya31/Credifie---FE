import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Sidebar from './sidebar';



import {BrowserRouter as Router, Route,Routes, Link, Switch} from 'react-router-dom'

function App() {
 
   

  return ( 
    
    <>
       <React.Fragment>
      <div className='grid-container'>
       
           <Header />
            <Sidebar />
            <Home />
           
      </div>
      </React.Fragment>
          {/* <Router>
           
            <Routes>
              <Route path="/group" element={<Group/>} />
            </Routes>
          </Router> */}
    </>
  );
}

export default App;
