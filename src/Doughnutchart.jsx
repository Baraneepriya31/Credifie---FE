// src/DoughnutChart.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement  } from 'chart.js';

ChartJS.register(ArcElement );

const DoughnutChart = () => {
    const data =  {
        //  labels: ['Application verified', 'On-Progress', 'Application Rejected'],
        datasets: [
            {
                label: 'Application Status',
                data: [25, 25, 50], // Replace with actual data
                backgroundColor: ['#f44336', '#ffeb3b','#4caf50'], // Colors for each segment
                hoverBackgroundColor: ['#ef5350', '#ffecb3' ,'#66bb6a']
            }
        ]
    };
      
    

    
    return (
        <div style={{ width: '550px', height: '200px', marginLeft:'20px' }}>
             <Doughnut data={data}   /> 
        </div>
    );
};

export default DoughnutChart;

// import React, { useState } from 'react';

// const DropdownComponent = () => {
//   // State to manage the outside button text and color
//   const [buttonText, setButtonText] = useState('Click to change');
//   const [buttonColor, setButtonColor] = useState('grey');

//   // Function to handle radio button click inside the dropdown
//   const handleRadioChange = (event) => {
//     const { value } = event.target;
//     if (value === 'approved') {
//       setButtonText('Approved');
//       setButtonColor('green');
//     } else if (value === 'rejected') {
//       setButtonText('Rejected');
//       setButtonColor('red');
//     } else if (value === 'pending') {
//       setButtonText('Pending');
//       setButtonColor('orange');
//     }
//   };

//   return (
//     <div>
//       {/* Outside button */}
//       <button style={{ backgroundColor: buttonColor, color: 'white' }}>
//         {buttonText}
//       </button>

//       Dropdown menu
//       <div style={{ marginTop: '10px', position: 'relative' }}>
//         <button style={{ backgroundColor: 'lightgrey', color: 'black' }}>
//           Dropdown
//         </button>
//         <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
//           <label>
//             <input type="radio" name="status" value="approved" onChange={handleRadioChange} />
//             Approve
//           </label>
//           <br />
//           <label>
//             <input type="radio" name="status" value="rejected" onChange={handleRadioChange} />
//             Reject
//           </label>
//           <br />
//           <label>
//             <input type="radio" name="status" value="pending" onChange={handleRadioChange} />
//             Pending
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };


