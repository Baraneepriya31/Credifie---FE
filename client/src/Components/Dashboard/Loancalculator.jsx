import React from 'react';
import './LoanCalculator.css'
import Back from './back.png'
import { IoIosArrowDropright } from "react-icons/io";

function LoanCalculator () {
              
   return(
    <div className="loancalculator">
    <div className="loan-calculator">
   <h4 className='loan'>Loan Calculator</h4>
   <img className='back-button' src={Back} alt="back" />
    </div>
    <div className='loan-container'>
    <div className="loan-amount">
      <p className='loan-text'>Loan amount</p>
      <button>Rs. 100,00000</button>
    </div>
           <div className="progressbar-1">
           <div className="progressbar2"></div>
           </div>
   
    <div className="loan-amount">
      <p className='loan-text'>Rate of interest</p>
      <button>%9.5</button>
    </div>
    <div className="progressbar-2">
           <div className="progressbar3"></div>
           </div>
    <div className="loan-amount">
      <p className='loan-text'>Loan tenure</p>
      <button>54 week</button>
    </div>
    <div className="progressbar-3">
           <div className="progressbar4"></div>
           </div>
           <div className="loan-amount">
      <p className='loan-text2'>Payment per week</p>
      <p className="week-amount">Rs.12,000</p>
    </div>
     </div>
           <div className="loan-amount">
           <h2 className='loan-amount2'>RS 100,00000</h2>
           <h2 className="total-interest">Rs 2484900</h2>
         </div>
         <div className='loan-amount'>
           <p className='principal-amount'>Principal amount</p>
           <p className="totalinterest">Total interest</p>
         </div>
         <div className='amount-line'>
           <p className='principal-amount2'></p>
           <p className="totalinterest2"></p>
         </div>
         <button className="calculate">Calculate <IoIosArrowDropright className="arrow-icon" /></button>
    </div>
   )
}


export default LoanCalculator