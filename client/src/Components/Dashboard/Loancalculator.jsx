import React, { useState } from 'react';
import './LoanCalculator.css'
import Back from './back.png'
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";


function LoanCalculator () {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState();
    const [interestRate, setInterestRate] = useState();
    const [tenureWeeks, setTenureWeeks] = useState();
    const [totalInterest, setTotalInterest] = useState();
    const [weeklyPayment, setWeeklyPayment] = useState(0);

  const Homepage = () => {  
    navigate("/Home");
  }
  const CalculateWeeklyPayment = () => {
  const principal = parseFloat(loanAmount);
  const rate = parseFloat(interestRate) / 100 / 54; 
  const weeks = parseInt(tenureWeeks);

  const weeklyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -weeks));
   setWeeklyPayment(weeklyPayment.toFixed(2));

  const totalAmountPaid = weeklyPayment * weeks;

  const totalInterest = totalAmountPaid - principal;

  setTotalInterest(totalInterest.toFixed(2));

  };

   return(
    <div className="loancalculator">
    <div className="loan-calculator">
   <h4 className='loan'>Loan Calculator</h4>
   <img onClick={Homepage} className='back-button' src={Back} alt="back" />
    </div>
    <div className='loan-container'>
    <div className="loan-amount">
      <p className='loan-text'>Loan amount</p>
      <input type='number'  placeholder='0' value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}  />
    </div>
           <div className="progressbar-1">
           <div className="progressbar2"></div>
           </div>
   
    <div className="loan-amount">
      <p className='loan-text'>Rate of interest</p>
      <input type="number" placeholder='0' value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
    </div>
    <div className="progressbar-2">
           <div className="progressbar3"></div>
           </div>
    <div className="loan-amount">
      <p className='loan-text'>Loan tenure</p>
      <input type="number" placeholder='0' value={tenureWeeks}  onChange={(e) => setTenureWeeks(e.target.value)} />
    </div>
    <div className="progressbar-3">
           <div className="progressbar4"></div>
           </div>
           <div className="loan-amount">
      <p className='loan-text2'>Payment per week</p>
      <p className="week-amount">{weeklyPayment}</p>
    </div>
     </div>
           <div className="loan-amount">
           <h2 className='loan-amount2'>{loanAmount}</h2>
           <h2 className="total-interest">{totalInterest}</h2>
         </div>
         <div className='loan-amount'>
           <p className='principal-amount'>Principal amount</p>
           <p className="totalinterest">Total interest</p>
         </div>
         <div className='amount-line'>
           <p className='principal-amount2'></p>
           <p className="totalinterest2"></p>
         </div>
         <button onClick={CalculateWeeklyPayment} className="calculate">Calculate <IoIosArrowDropright className="arrow-icon" /></button>
    </div>
   )
}


export default LoanCalculator