// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Header from './Components/Header'
// import Sidebar from './Components/sidebar';
// import Home from './Components/Home'
// import Group from './Components/Group'



// import {BrowserRouter as Router, Route,Routes, Link, Switch} from 'react-router-dom'



// function App() {
 
   

//   return ( 
    
//     <>
//        <Router>
//       <div className='grid-container'>
        
//           <Header />
//           <Sidebar />
//           <Home />
            
//           <div>
//           <Routes>
            
//             <Route path="/group" element={<Group />} />
//           </Routes>
//         </div>
            
             
//       </div>
//       </Router>
          
//     </>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/sidebar';
import Home from './Components/Home';
import Group from './Components/Group';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='grid-container'>
        <Header />
        <Sidebar />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
