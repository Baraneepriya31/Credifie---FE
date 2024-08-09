import React, { useState, useEffect } from "react";
import axios from "axios";
import './application-status.css';
import { FiDownload } from "react-icons/fi";
import dropdown from './Vector.png';
import pdf from './pdf-file 1.png';
import dropdownblack from './dropdown black.png';
import { CiSearch } from "react-icons/ci";
import closeicon from './ion_close.png';
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

function ApplicationStatus() {

  const [modal, setModal] = useState(false);
  const [buttonText, setButtonText,] = useState('Submitted');
  const [buttonColor, setButtonColor] = useState('#12c2e9');
  // const [Openmodal, setOpenModal] = useState(false);
  const [openPopup, setPopup] =useState(false);
  const [opensave, setopenDownload] =useState(false);
  const [opensend, setopenShare]=useState(false);
  const [share, setopensuccess] =useState(false);
  const [email, setEmail] = useState('');
  const [fileType, setFileType] = useState('');
  const [grouppopup, setGroupId] = useState(false); 
  // const [appstatuspopup, setAppstatusPopup] = useState(false);
  // const [collectionagent, setCollectionagent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('R.Suresh Krishna');
  const [agents, setAgents] = useState([]);
  const [togglemodal2, settoggleModal2] = useState(false);
  const [appstatuspopup2, setAppstatusPopup2] = useState(false);
  const [collectionagent2, setCollectionagent2] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("");
  // const [selectedStatus1, setSelectedStatus1] = useState("");
  // const [appliedStatus1, setAppliedStatus1] = useState("");
   const [isVisible, setIsVisible] = useState(false);
   const [dropdownVisible, setDropdownVisible] = useState(true);
    
  useEffect(() => {
    const savedVisibility = localStorage.getItem('isDivVisible');
    if (savedVisibility === 'true') {
      setIsVisible(false);
    }
  }, []);

  //  const handleDisbursedClick = () => {
  //    setIsVisible(true);
  //    localStorage.setItem('isDivVisible', 'true');
  //  };


  // const agents = [
  //   'B.Vijay',
  //   'S.Ramesh',
  //   'A.Karthik',
  //   'R.Ram',
  //   'V.Vignesh',
  //   'D.Dhanush',
  //   'V.Harish',
  // ];
               
  const handleRadioChange = (event) => {
    setSelectedStatus(event.target.value);
      setAppliedStatus(event.target.value);
};


 const handleOk = () => {
   setAppliedStatus(selectedStatus);
  AppstatusPopup2(false);
  if (appliedStatus === 'disbursed') {
    setIsVisible(true);
    localStorage.setItem('isDivVisible', 'true');
    setButtonColor('#2CBA00'); 
      setButtonText('Disbursed'); 
      setDropdownVisible(false); 
  }
 };
const handlecancel = () => {
  setAppliedStatus(appliedStatus);
  AppstatusPopup2(false);
}
// const handleButtonClick = () => {
//   OpenModal();
// };
const updateButtonTextAndColor = (newStatus) => {
    // Update the button text and color based on the new status
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

  useEffect(() => {
    updateButtonTextAndColor(appliedStatus);
  }, [appliedStatus]);



  const Popup = ()=>{
  setPopup(!openPopup);
  }
  if(openPopup){
  document.body.classList.add('active-model')
  }
  else{
    document.body.classList.remove('active-model')
  }

  const openDownload=()=>{
    setopenDownload(true);
    setPopup(false);
  }

  const openShare =()=>{
    setopenShare(true);
    setPopup(false);
  }

  const sendSuccess=()=>{
    setopensuccess(true);
    setopenShare(false);
  }


    const toggleModal = ({ isOpen }) => {
      setModal(!modal);
      if (!isOpen) return null;
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
   

    const closeShare = () => {
      setopenShare(false);
      setopenDownload(false);
      setopensuccess(false);
      
    }
  
    const emailPdf = () => {
      setFileType('PDF');
    };
  
    const emailExcel = () => {
      setFileType('Excel');
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSend = (e) => {
      e.preventDefault();
      console.log(`Sending ${fileType} report to ${email}`);
      closeShare(); 
    };
    

    // const OpenModal = () => {
    //   setOpenModal(!Openmodal);
    // };
  
    // if(Openmodal) {
    //   document.body.classList.add('active-modal')
    // } else {
    //   document.body.classList.remove('active-modal')
    // }

    const GroupId = () => {
      setGroupId(!grouppopup);
    };
  
    if(grouppopup) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
    // const AppstatusPopup = () => {
    //   setAppstatusPopup(!appstatuspopup);
    // };
  
    // if(appstatuspopup) {
    //   document.body.classList.add('active-modal')
    // } else {
    //   document.body.classList.remove('active-modal')
    // }

    // const Collectionagent = () => {
    //   setCollectionagent(!collectionagent);
    // };
    // if(collectionagent) {
    //   document.body.classList.add('active-modal')
    // } else {
    //   document.body.classList.remove('active-modal')
    // }
    useEffect(() => {
      const fetchAgents = async () => {
        try {
          const response = await axios.get('/api/agents'); // Adjust the endpoint as necessary
          setAgents(response.data);
        } catch (error) {
          console.error('Error fetching agents:', error);
        }
      };
  
      fetchAgents();
    }, []);

    
    const handleAgentSelect = (agent) => {
      setSelectedAgent(agent);
      // setCollectionagent(false); // Close the dropdown after selecting an agent
    };
    
  //   const handleRadioChange1 = (event) => {
  //     setSelectedStatus1(event.target.value);
  // };
  
  // const handleOkClick1 = () => {
  //   setAppliedStatus1(selectedStatus1);
  //   AppstatusPopup(false);
  // };
  
  // const handleButtonClick1 = () => {
  //   AppstatusPopup();
  // };
          
  // const updateButtonTextAndColor1 = (newStatus1) => {
  //   // Update the button text and color based on the new status
  //   if (newStatus1 === 'approved') {
  //     setButtonText('Approved');
  //     setButtonColor('#25AE7A');
  //   } else if (newStatus1 === 'submitted') {
  //     setButtonText('Submitted');
  //     setButtonColor('#62B8FC');
  //   } else if (newStatus1 === 'acknowledged') {
  //     setButtonText('Acknowledged');
  //     setButtonColor('#FFBE0B');
  //   } else if (newStatus1 === 'inprogress') {
  //     setButtonText('Inprogress');
  //     setButtonColor('#FFBE0B');
  //   } else if (newStatus1 === 'deadline') {
  //     setButtonText('Deadline');
  //     setButtonColor('orange');
  //   }else if (newStatus1 === 'disbursed') {
  //     setButtonText('Disbursed');
  //     setButtonColor('#2CBA00');
  //   }
  // };

  // useEffect(() => {
  //   updateButtonTextAndColor1(appliedStatus1);
  // }, [appliedStatus1]);


    const [loanDetails,setLoanDetails] = useState({
      location:'',
     loanamount:'',
     loanaccountnumber:'',
     tenure:'',
     interest:'',
     duedate:'',
    });
    const handleChange = (e, role, field ) => {
      const { value } = e.target;
  
      if (role === 'loan') {
        setLoanDetails(prevDetails => ({
          ...prevDetails,
          [field]: value,
        }));
      } 
    };
    
    const handleSubmit = async () => {
      try {
          await axios.post('http://localhost:3008/add-loan', loanDetails);
          console.log(loanDetails);
          alert('loan added successfully');
      } catch (error) {
          console.error('Error adding loan:', error);
      }
    };
          

    const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter < 100) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter < 100) {
            return prevCounter + 1;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [counter]);

  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.background = `conic-gradient(#044483 ${counter * 3.6}deg, #ededed 0deg)`;
      if (counter === 100) {
        progressBar.classList.add('complete');
      }
    }
  }, [counter]);

   
  // const handleRadioChange = (event) => {
  //   const { value } = event.target;
  //   if (value === 'approved') {
  //     setButtonText('Approved');
  //     setButtonColor(' #25AE7A');
  //   } else if (value === 'acknowledged') {
  //     setButtonText('Acknowledged');
  //     setButtonColor(' #FFBE0B');
  //   } else if (value === 'deadline') {
  //     setButtonText('Deadline');
  //     setButtonColor('orange');
  //   }else if (value === 'inprogress') {
  //     setButtonText('On-Process');
  //     setButtonColor('#FFBE0B');
  //   }else if (value === 'submitted') {
  //     setButtonText('Submitted');
  //     setButtonColor('#62B8FC');
  //   }else if (value === 'disbursed') {
  //     setButtonText('Disbursed');
  //     setButtonColor('#2CBA00');
  //   }
  // }    
    const toggleModal2 = () => {
      settoggleModal2(!togglemodal2)
    }

    const AppstatusPopup2 = () => {
      setAppstatusPopup2(!appstatuspopup2);
    };
       
       const Collectionagent2 = () => {
        setCollectionagent2(!collectionagent2)
       }

       

    return (
        <div className="application-status-container">
            <div className="application-status-header">
            <button className="application-status-button">
             1,150 
             <br /> &nbsp;
        Total&nbsp;Application
            </button>
            <button className="application-status-button">
                1,150
                <br /> &nbsp;
                Application&nbsp;Submitted
            </button>
            <button className="application-status-button">
                1,150
                <br /> &nbsp;
                Accepted&nbsp;Applications
            </button>
            <button className="application-status-button">
               1,150
               <br /> &nbsp;
              Verification
            </button>
            <button className="application-status-button">
              1,150
              <br /> &nbsp;
              Sanction&nbsp;Loan
            </button>
            <button className="application-status-button">
              1,150
              <br /> &nbsp;
              Loan&nbsp;Disbursed
            </button>
            </div>
            <div className="application-status-text">
                <p>Total Application</p>
            </div> 
            <div className="table-container">
            <div className="box-header">
                <div className="box1">
                <div className="search-container">
                <input type="text" className="search-box" placeholder="Type here to search..." />
                <CiSearch className="search-icon"/>
                </div>
                <button className="add-application-button" onClick={toggleModal}>Add Loan Application +</button>
                <button className="download-button" onClick={Popup} >Download  <FiDownload /> </button>
                </div>

                {/* First popup for download and share */}
                {openPopup && (<div className="download-popup">
                  <div onClick={Popup} className="overlay"></div>
                  <div className="download-box">
                    <div onClick={Popup}  className="close-icon">&times;</div>
                  <h5>Download & Share</h5>
                   <form>
                    <div>
                     <div className="dwnl-ft">
                      <div>
                    <label for="date">From</label>
                    <input type="date"></input>
                    </div>
                    <div>
                    <label for="date">To</label>
                    <input type="date"></input>
                    </div>
                    </div>
                    <div className="radio-btn">
                    <p>File type</p>
                    <input type="radio"/>.xlsx
                    &nbsp;
                    <input type="radio"/>.pdf
                    </div>
                    <div className="dwnl-button">
                    <button className="downloat-btn" onClick={openDownload}>Download</button>
                    <button className="share-btn" onClick={openShare}>Share</button>
                      </div>
                    </div>
                    </form>
                  </div>
                </div>)
                }
        
      {/*Second popup for share*/ }

     {opensend && (
        <div className="share-popup">
          <div onClick={closeShare} className="overlay-1"></div>
          <div className="share-box">
            <div className="close-icon" onClick={closeShare}>&times;</div>
            <div className="share-rpt">
              <p>Email report</p>
              <span>Select The File Type You Would Like To Your Email</span>
              <div className="pdfxl-btn">
              <button onClick={emailPdf}>
                  <FaFilePdf style={{ color: 'red' }} /> Pdf File
                </button>
                <button onClick={emailExcel}>
                  <FaFileExcel style={{ color: 'green' }} /> Excel
                </button>
              </div>
              <form onSubmit={handleSend}>
                <div className="input-share">
                <span>Email <MdOutlineMailOutline /></span>
                <label htmlFor="email"></label>
                <input
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={handleEmailChange} 
                  required
                />
                </div>
                <div className='send-button'>
                <button type="submit" onClick={sendSuccess}>Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
       {opensave && (
        <div className="circular-progress">
        <div onClick={openDownload} className="overlay-2"></div>
        <div className="progress-box">
        <div className="progress-bar">
        {/* <span className="progress-value">{counter}%</span> */}
        <span className="tick">&#10004;</span>
        </div>
        <span className="progress-text">Download successfully</span>
        </div>
      </div>
      )}

{/*Popup for send successful message*/}
      {share && (
        <div className="circular-progress">
        <div onClick={sendSuccess} className="overlay-2"></div>
          <div className="progress-box">
            <div className="progress-bar">
          {/* <span className="progress-value">{counter}%</span> */}
          <span className="tick">&#10004;</span>
          </div>
          <span className="progress-text">Report send successfully</span>
          </div>
          </div>
      )}


{/*Popup for send successful message*/}
      {opensave && (
        <div className="share-popup">
          <div onClick={closeShare} className="overlay"></div>
          <div className="share-box">
            
          </div>
        </div>
      )}

        <table className='table2'>
            <thead>
                <tr>
                    <td>Application ID</td>
                    <td>Application Date</td>
                    <td>Group Name</td>
                    <td>Group Leader</td>
                    <td>Contact No</td>
                    <td>Loan Amount</td>
                    <td>Application Status</td>
                </tr>
            </thead>
            <tbody>
                <tr>
  <td onClick={toggleModal2} ><div style={{color:'#0087F3', cursor:'pointer'}} >CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td onClick={GroupId}><div style={{color:'#0087F3' ,cursor:'pointer'}} >Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>

                <tr>
                    <td onClick={toggleModal2} ><div style={{color:'#0087F3',cursor:'pointer'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td onClick={GroupId}><div style={{color:'#0087F3',cursor:'pointer'}}>Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }} 
                    className="loan-status">{buttonText} </td>
                </tr>
         </tbody>
      </table>
           
      {togglemodal2 && (
        <div className="modal">
          <div onClick={toggleModal2} className="overlay"></div>
          <div className="modal-content">
            
            <h4 className="appno-status">Application no SLK-123456</h4>
            <p className="status">Status</p>

            <button style={{ backgroundColor: buttonColor, color: 'white', 
            cursor: dropdownVisible ? 'pointer' : 'default' }} 
        onClick={dropdownVisible ? AppstatusPopup2 : true} 
        className="btn" 
        disabled={!dropdownVisible}
      >
        {buttonText} &nbsp;
        {dropdownVisible && <img src={dropdown} alt="dropdown" />}</button>

             {appstatuspopup2 && (
        <div className="app-statuspopup">
          <div className="modal-list">
            <div className="submitted">
  <input   className="radio-button" type="radio" name="status" 
 value="submitted" onChange={handleRadioChange} /> 
            <p className={`submit ${appliedStatus === "submitted" ? "#62B8FC" : ""}`} >
              Submitted</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="acknowledged"
             onChange={handleRadioChange} />
            <p className={`submit ${appliedStatus === "acknowledged" ? "#FFBE0B" : ""}`}>
              Acknowledged</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="approved" 
            onChange={handleRadioChange} />
            <p className={`submit ${appliedStatus === "approved" ? "#25AE7A" : ""}`}>
              Approved</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="deadline" 
            onChange={handleRadioChange} />
            <p className={`submit ${appliedStatus === "deadline" ? "orange" : ""}`} >
              Deadline</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="disbursed" 
            onChange={handleRadioChange} />
            <p  className={`submit ${appliedStatus === "disbursed" ? "#2CBA00" : ""}`}>
              Disbursed
            </p>
            </div> <div className="submitted">
            <input style={{color:'#393938'}}  className="radio-button" type="radio" name="status" value="inprogress" 
            onChange={handleRadioChange} />
            <p className={`submit ${appliedStatus === "inprogress" ? "#FFBE0B" : ""}`}>
              In-Progress</p>
            </div>
            <div className="submitted">
            <p onClick={handlecancel} className="cancel">Cancel</p>
            <button onClick={handleOk} className="btn-ok">Ok</button>
            </div>
            
                  </div>
                  </div>
                  
            )}
  
            
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
              
              <h4 className="group-info">Attachments</h4>
              <div className="group-details">
                <div className="group-information">
                 <p>Pan card</p>
                 <br/>
                 <p>Photos</p>
            
                </div>
                <div>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
               
                <p className="not-attached">*Not Attached </p>
                </div>
              </div>
                    {isVisible && (
           <div className="loan-section" style={{display: 'block'}} >
             <div className="loanstatus-active">
                      <h4>Loan Status <span>ACTIVE</span></h4>
                      <p className="collection">Collection Agent</p>
                    </div>
                    <button onClick={Collectionagent2} className="btn2">  {selectedAgent} &nbsp;
                        <img className="dropdown" src={dropdownblack} alt="dropdown2" /> </button>
                        
                        {collectionagent2 && (
               <div className="collection-agent-popup">
               <div className = "agent-list">
               {agents.map((agent, index) => (
              <li key={index} onClick={() => handleAgentSelect(agent)}>
                {agent}
              </li>
            ))}
         
               </div>
               </div>
              )}
              <div className="group-details">
              <div className="group-information">
            <p>Loan Account Number</p>
            <p>Tenure</p>
            <p>Interest</p>
            <p>Due Date</p>
            <p>Bank Pass Book</p>
              </div>
              <div className="information">
              <p>Rs.1,50,000</p>
              <p>IDFC2338K 230599D</p>
              <p>52 Weeks</p>
              <p>15%</p>
              <div className="img-pdf">  <img src={pdf} alt="pdf"  />
              <p className="information">img.pdf</p></div>
              </div>   
              </div>
              </div>
      
    )}
              <div className="add-loan-button">
                <button onClick={handleSubmit}>ADD</button>
              </div>
              <button className="close-modal" onClick={toggleModal2}>
                <img src={closeicon} alt="icon" /></button>
                 
               </div>
             </div>
      )}

          
      
        
        {grouppopup && (
                      <div className='grouppopup'>
                        <div onClick={GroupId} className='overlay'></div>
                        <div className="groupid-content">
                      <h5 className='group-id5'>Group Id</h5>
                      <div className="group-member">
                      <h5>Group Member  <span style={{color:'#393938',width:'100vw'}}>0</span> </h5>
                      <div className='application-status2'>
                       <h4> Application Status</h4>
                       <button className='pending'>Pending</button>
                      </div>
                      </div>
                      <button className="close-modal" onClick={GroupId}>
              <img src={closeicon} alt="icon" />
            </button>
                   <div className='table-1'>
                    <div>
                    <table className='group-table'>
                      <tr>
                       <td className='id-details'>Group Id</td>
                       <td className='id-info'>- &nbsp; G 401</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Group Name</td>
                       <td  className='id-info'>- &nbsp;  Chennai Group</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Group Leader</td>
                       <td  className='id-info'>- &nbsp;  Vijay</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Contact Number</td>
                       <td  className='id-info'>- &nbsp;+ 91 7890123456</td>
                      </tr>
                    </table>
                   </div> 
                   <div className="table-2">
                    <table className='group-table'>
                      <tr>
                      <td className='id-details'>Loan Amount</td>
                      <td className='id-info'>- &nbsp; Rs.2,50,000</td>
                      </tr>
                     &nbsp;
                      <tr>
                       <td className='id-details'>Collection Agent</td>
                       <td  className='id-info'>- &nbsp;  Vijay</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Over Due</td>
                       <td  className='id-info'>- &nbsp;  Rs.60,000</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Loan Status</td>
                       <td  className='id-info'>- &nbsp;Active/3</td>
                      </tr>
                   </table>
                   </div>
                   </div>
                       <p className='loan-history'>Loan History</p>
                       <div className='loanstatus-act-clo'>
                       <div>
                        <p className="loanstats">Loan Status</p>
                       </div>
                       &nbsp;
                       <div>
                       <button className='loanstatus-act'>Active/3 
                       <img className="dropdown" src={dropdown} alt="dropdown" /> </button>
                       </div>
                       </div>
                       <div>
                        <table className='loanhistory-table'>
                          <th>Serial Number</th>
                          <th>Loan Amount</th>
                          <th>Account Number</th>
                          <th>Weekly Payment</th>
                          <th>Due Date</th>
                          <th>Tenure</th>
                          <tr>
                            <td>1234567</td>
                            <td>2,50,000</td>
                            <td>01123745678</td>
                            <td>Rs.5000</td>
                            <td>05-07-2023</td>
                            <td className="tenure" style={{color:'#0859aa'}}>52/60</td>
                          </tr>
                         &nbsp;
                          <tr>
                            <td>1234567</td>
                            <td>2,50,000</td>
                            <td>01123745678</td>
                            <td>Rs.5000</td>
                            <td>05-07-2023</td>
                            <td className="tenure" style={{color:'#0859aa'}}>52/60</td>
                          </tr>
                          &nbsp;
                          <tr>
                            <td>1234567</td>
                            <td>2,50,000</td>
                            <td>01123745678</td>
                            <td>Rs.5000</td>
                            <td>05-07-2023</td>
                            <td> <div className="tenure" style={{color:'#0859aa'}}>52/60</div></td>
                          </tr>
                        </table>
                       </div>
                        </div>
                      </div>
                     )}


        {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="group-id-box">
            <h4>Group ID</h4> 
            <input type="text"/>
            </div>
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
                <label>
              <input type="text" id="name" name="name" className="input-line"
              value={loanDetails.loanamount} onChange={(e) => handleChange(e, 'loan', 'loanamount')} />
              </label>
              <label>
              <input type="text" id="name" name="name" className="input-line"/>
                </label>
              <label>
              <input type="text" id="name" name="name" className="input-line"/>
              </label>
              <label>
              <input type="text" id="name" name="name" className="input-line"/>
              </label>
              <label>
              <input type="text" id="name" name="name" className="input-line"
    value={loanDetails.location} onChange={(e) => handleChange(e, 'loan', 'location')} />
              </label>
              </div>
              </div>
            
              <h4 className="group-info">Attachments</h4>
              <div className="group-details">
                <div className="group-information">
                 <p>Pan card</p>
                 <br/>
                 <p>Photos</p>
                 <br/>
                </div>
                <div>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
              
                </div>
              </div>
              <div className="add-loan-button1">
                <button onClick={handleSubmit}>ADD</button>
              </div>
            <button className="close-modal" onClick={toggleModal}>
              <img src={closeicon} alt="icon" />
            </button>
          
          </div>
   
        </div>
      )}
      </div>
     
     </div>
     </div>
)}

export default ApplicationStatus;
