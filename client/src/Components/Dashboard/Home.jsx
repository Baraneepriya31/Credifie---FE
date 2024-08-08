

  import React, { useState} from "react";
  
  import { BsCalendar2Date} from 'react-icons/bs'
   import iconimage from './Group 385.png'
   import rectangle from './Rectangle 257.png'
   import rectangle2 from './Rectangle 258.png'
   import rectangle3 from './Rectangle 259.png'
  //  import dropdown from './Vector.png'
   import closeion from './ion_close.png'
   import pdf from './pdf-file 1.png'
   import elipse from './Ellipse 45.png'
   import elipse2 from './Ellipse 46.png'
   import elipse3 from './Ellipse 46 (1).png'
   import DoughnutChart from "./Doughnutchart";
   import { useNavigate } from "react-router-dom";
   
  function Home() {
                    
    const [modal, setModal] = useState(false);
    // const [Openmodal, setOpenModal] = useState(false);
    // const [Openmodal2, setOpenModal2] = useState(false);
    const [buttonText, setButtonText,] = useState('Submitted');
    const [buttonColor, setButtonColor] = useState('#12c2e9');
    const [report, setreportmodal] = useState(false);
    const navigate = useNavigate();
  //   const [selectedStatus, setSelectedStatus] = useState("");
  // const [appliedStatus, setAppliedStatus] = useState("");
    
    const loanpage = () => {  
      navigate("/LoanCalculator");
    }

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
      
    // const OpenModal = () => {
    //   setOpenModal(!Openmodal);
    // };
  
    // if(modal) {
    //   document.body.classList.add('active-modal')
    // } else {
    //   document.body.classList.remove('active-modal')
    // }
     
    // const OpenModal2 = () => {
    //   setOpenModal2(!Openmodal2);
    // };
  
    // if(modal) {
    //   document.body.classList.add('active-modal')
    // } else {
    //   document.body.classList.remove('active-modal')
    // }

    const reportmodal = () => {
      setreportmodal(!report);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
       
  //   const handleRadioChange = (event) => {
  //     setSelectedStatus(event.target.value);
  // };
  
  // const handleOkClick = () => {
  //   setAppliedStatus(selectedStatus);
  //   OpenModal(false);
  // };
  
  // const handleButtonClick = () => {
  //   OpenModal();
  // };
    const updateButtonTextAndColor = (newStatus) => {
  //     // Update the button text and color based on the new status
         if (newStatus === 'approved') {
         setButtonText('Approved');
        setButtonColor('#25AE7A');
      } else if (newStatus === 'submitted') {
        setButtonText('Submitted');
        setButtonColor('#62B8FC');
      } else if (newStatus === 'acknowledged') {
        setButtonText('Acknowledged');
        setButtonColor('#FFBE0B');
      } else if (newStatus === 'inprogress') {
        setButtonText('Inprogress');
        setButtonColor('#FFBE0B');
      } else if (newStatus === 'deadline') {
        setButtonText('Deadline');
        setButtonColor('orange');
      }else if (newStatus === 'disbursed') {
        setButtonText('Disbursed');
        setButtonColor('#2CBA00');
      }
    };
  
    // useEffect(() => {
    //   updateButtonTextAndColor(appliedStatus);
    // }, [appliedStatus]);
    
  
  
    return (
      <main className='main-container'>
          <div className='main-title'>
              <h3>Current Months</h3>
            
              <h2 onClick={reportmodal} className="date">Detailed Report  <BsCalendar2Date className="date-icon"/></h2>
              <h2  className="date" onClick={loanpage}>Loan Calculator </h2>
              </div>
              {report && (  
                 <div className="report-modal">
                  <div className="report-content">
                   <p className="report-p">For Which Period do you need a report?</p>
                   <div className="report-month">
                       <input className="radio" type="radio" />
                       <p className="month">Last month</p>
                       <input className="radio2" type="radio" />
                       <p className="month2">Last 3 month</p>
                   </div>
                   <div className="report-month">
                       <input className="radio" type="radio" />
                       <p className="month">Last 6 month</p>
                       <input className="radio3" type="radio" />
                       <p className="month3">Last 1 year</p>
                   </div>
                   <div className="due-month">
                   <p className="from-month">From</p>
                   <p className="to-month">To</p>
                    </div>
                    <div className="month-date">
                       <input className="month-from" type="date" />
                       <input className="month-to" type="date" />
                      
                   </div>
                   <button onClick={reportmodal} className=" btn-proceed">Proceed</button>
                  </div>
                </div>
             ) }
           
            <p className="due-date">31st Aug 2023 - 30th Sept 2023</p>
            
          <div className='main-cards'>
              <div className='card'>
                  <div className='card-inner'>
            <img className="rectangle" src={rectangle} alt="shape" width="40px" height="50px"/> 
                  <img src={iconimage} alt="icon" className="card-icon" />
                      <h3>Amount Disbursed</h3>
                  </div>
                  <h1 className="amount">Rs.3,50,000</h1>
                  <p className="due-from">To 150 groups</p>
                 
              </div>
              <div className='card'>
                  <div className='card-inner'>
                  <img className="rectangle" src={rectangle2} alt="shape" width="40px" height="50px"/> 
                  <img src={iconimage} alt="icon" className="card-icon" />
                      <h3>Amount Redeemed</h3> 
                  </div>
                  <h1 className="amount">Rs.3,50,000</h1>
                  <p className="due-from">To 150 groups</p>
                 
              </div>
              <div className='card'>
                  <div className='card-inner'>
                  <img className="rectangle" src={rectangle3} alt="shape" width="40px" height="50px"/> 
                  <img src={iconimage} alt="icon" className="card-icon" />
                      <h3>Total Overdue Loans</h3>
                  </div>
                  <h1 className="amount">Rs.3,50,000</h1>
                  <p className="due-from">To 150 groups</p>
                 
                  
              </div>
              
          </div>
             
             <div className="content">
            <div className="application-status">
                <h3>Application</h3>
                <hr />
                <p className="total-application">Total</p>
                <h4 className="total">1,150</h4>
               <DoughnutChart />
                {/* <img className="circularprogress" src={chart} /> */}
                <div className="application-elipse">
                <img className="elipse" src={elipse} alt="elipse"/>
                <p className="elipse-status">Application Verified</p>
                <img className="elipse2" src={elipse2} alt="elipse"/>
                <p className="elipse-status2">On Process</p>
                </div>
                <div className="application-elipse">
                <img className="elipse3" src={elipse3} alt="elipse"  />
                <p className="elipse-status3">Application Rejected</p>
                </div>
            </div>
            <div className="recent-application">
              <h3 className="application-heading" >Recent Application</h3>
              <table className="table">
              
                 <th>Application No.</th>
                <th>SHG Name</th>
                <th>Loan Amount</th>
                <th>Phone No.</th>
                <th>Collection Agent</th>
                <th>Loan Status</th>
                
                <tr>
                  <td className="application-no" onClick={toggleModal}>SLK-123456</td>
                  <td>Magalir Matum</td>
                  <td>Rs.2,50,000</td>
                  <td>+91 980765421</td>
                  <td>N/A</td>
<td style={{ backgroundColor: buttonColor, color:'white' }}
 onChange={updateButtonTextAndColor}  className="loan-status">{buttonText} </td>
                </tr>
             
                   &nbsp; 
                <tr>
                  <td className="application-no"onClick={toggleModal}>SLK-123456</td>
                  <td>Magalir Matum</td>
                  <td>Rs.2,50,000</td>
                  <td>+91 980765421</td>
                  <td>B.Vijay Vasanth</td>
                  <td className="loan-status2" >Approved </td>
                  
                </tr>
                &nbsp;
                <tr>
                  <td className="application-no"onClick={toggleModal}>SLK-123456</td>
                  <td>Magalir Matum</td>
                  <td>Rs.2,50,000</td>
                  <td>+91 980765421</td>
                  <td>N/A</td>
                  <td className="loan-status3">On-Process  </td>
</tr>
     
                &nbsp;
                <tr>
                  <td className="application-no" onClick={toggleModal}>SLK-123456</td>
                  <td>Magalir Matum</td>
                  <td>Rs.2,50,000</td>
                  <td>+91 980765421</td>
                  <td>R.Mohammed</td>
                  <td className="loan-status4">On-Process  </td>
                  
                </tr>
                &nbsp;
                <tr>
                  <td className="application-no" onClick={toggleModal}>SLK-123456</td>
                  <td>Magalir Matum</td>
                  <td>Rs.2,50,000</td>
                  <td>+91 980765421</td>
                  <td>N/A</td>
                  <td className="loan-status5">Submitted</td>
</tr>
                    
              </table>
                 {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            
            <h4 className="appno-status">Application no SLK-123456</h4>
            <p className="status">Status</p>

            <button className="btn"> Disbursed </button>

            
            <h4 className="group-info">Group Info</h4>
            <div className="group-details">
             <div className="group-information"> 
              <p>Group Name</p>
              <p>Group Leader</p>
              <p>Contact Number</p>
              <p>Group Members</p>
              <p>Location</p>
              </div>
              <div className="information">
                <p>Kamala Self Help Group</p>
                <p>Ezhisai Valli</p>
                <p>+91 9876543210</p>
                <p>25</p>
                <p>Colombo,Sri Lanka</p>
              </div>
              </div>
              
             <div className="loanstatus-active">
              <h4>Loan Status <span>ACTIVE</span></h4>
              <p className="collection">Collection Agent</p>
            </div>
            <p className="collec-agent"> R.Suresh Kumar</p>
              <div className="group-details">
              <div className="group-information">
            <p>Loan Account Number</p>
            <p>Tenure</p>
            <p>Interest</p>
            <p>Due Date</p>
              </div>
              <div className="information">
              <p>Rs.1,50,000</p>
              <p>IDFC2338K 230599D</p>
              <p>52 Weeks</p>
              <p>15%</p>
              <p>15%</p>
              </div>
              </div>
             
              <h4 className="group-info">Attachments</h4>
              <div className="group-details">
                <div className="group-information">
                 <p>Pan card</p>
                 <br/>
                 <p>Photos</p>
                 <br/>
                 <p>Bank Pass Book</p>
                </div>
                <div>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
                <hr className="attachments-line" />
                <p className="not-attached">*Not Attached </p>
                
                <hr className="attachments-line" />
                <br/>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
                <hr className="attachments-line" />
                </div>
              </div>
              <button className="close-modal" onClick={toggleModal}>
                <img src={closeion} alt="icon" /></button>
              </div>
          </div>
        )}
        </div>
        </div>
        </main>
  )}
  export default Home;