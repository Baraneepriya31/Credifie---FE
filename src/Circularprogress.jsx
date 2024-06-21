import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ value }) => {
  return (
    <CircularProgressbar className='circularprogress'
    value={value}
    
    styles={buildStyles({
      pathColor: `#d6d6d6 ${value}`,
       strokeColor:'#c471ed',
      trailColor: '#d6d6d6',
      
       
      })}
    />
      
  )
}

export default CircularProgressBar
