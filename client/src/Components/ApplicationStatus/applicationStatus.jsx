import React, { useState, useEffect } from "react";
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
  const [Openmodal, setOpenModal] = useState(false);
  const [openPopup, setPopup] =useState(false);
  const [opensave, setopenDownload] =useState(false);
  const [opensend, setopenShare]=useState(false);
  const [share, setopensuccess] =useState(false);
  const [email, setEmail] = useState('');
  const [fileType, setFileType] = useState('');
  const [grouppopup, setGroupId] = useState(false); 


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


    const toggleModal = () => {
      setModal(!modal);
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
    

    const OpenModal = () => {
      setOpenModal(!Openmodal);
    };
  
    if(Openmodal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    const GroupId = () => {
      setGroupId(!grouppopup);
    };
  
    if(grouppopup) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

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

         

    
    
  const handleRadioChange = (event) => {
    const { value } = event.target;
    if (value === 'approved') {
      setButtonText('Approved');
      setButtonColor(' #25AE7A');
    } else if (value === 'acknowledged') {
      setButtonText('Acknowledged');
      setButtonColor(' #FFBE0B');
    } else if (value === 'deadline') {
      setButtonText('Deadline');
      setButtonColor('orange');
    }else if (value === 'inprogress') {
      setButtonText('On-Process');
      setButtonColor('#FFBE0B');
    }else if (value === 'submitted') {
      setButtonText('Submitted');
      setButtonColor('#62B8FC');
    }else if (value === 'disbursed') {
      setButtonText('Disbursed');
      setButtonColor('#2CBA00');
    }
};
    return (
        <div className="application-status-container">
            <div className="application-status-header">
            <button className="application-status-button">
                <span className="application-count">1,150</span>
                <span className="application-label">Total Applications</span>
            </button>
            <button className="application-status-button">
                <span className="application-count">1,150</span>
                <span className="application-label">Applications Submitted</span>
            </button>
            <button className="application-status-button">
                <span className="application-count">1,150</span>
                <span className="application-label">Accepted Applications</span>
            </button>
            <button className="application-status-button">
                <span className="application-count">1,150</span>
                <span className="application-label">Verification</span>
            </button>
            <button className="application-status-button">
                <span className="application-count">1,150</span>
                <span className="application-label">Sanction Loan</span>
            </button>
            <button className="application-status-button">
                <span className="application-count">1,150</span>
                <span className="application-label">Loan Disbursed</span>
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
                    <td onClick={toggleModal} ><div style={{color:'#0087F3', cursor:'pointer'}} >CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td onClick={GroupId}><div style={{color:'#0087F3' ,cursor:'pointer'}} >Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>

                <tr>
                    <td onClick={toggleModal} ><div style={{color:'#0087F3',cursor:'pointer'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td onClick={GroupId}><div style={{color:'#0087F3',cursor:'pointer'}}>Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }}
  onClick={OpenModal} className="loan-status">{buttonText}<img className="dropdown" src={dropdown} alt="dropdown" /> </td>
                </tr>
              {Openmodal && (
        <div className="openmodal-2">
          <div className="modal-list">
            <div className="submitted">
            <input   className="radio-button" type="radio" name="status" value="submitted" onChange={handleRadioChange} />
            <p className="submit" >Submitted</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="acknowledged" onChange={handleRadioChange} />
            <p className="submit">Acknowledged</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="approved" onChange={handleRadioChange} />
            <p className="submit">Approved</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="deadline" onChange={handleRadioChange} />
            <p className="submit">Deadline</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="disbursed" onChange={handleRadioChange} />
            <p className="submit">Disbursed</p>
            </div> <div className="submitted">
            <input style={{color:'#393938'}}  className="radio-button" type="radio" name="status" value="inprogress" 
            onChange={handleRadioChange} />
            <p className="submit">In-Progress</p>
            </div>
            <div className="submitted">
            <p onClick={OpenModal} className="cancel">Cancel</p>
            <button onClick={OpenModal} className="btn-ok">Ok</button>
            </div>
            
                  </div>
                  </div>
                  
            )}
  
         </tbody>
      </table>
        
        {grouppopup && (
                      <div className='grouppopup'>
                        <div onClick={GroupId} className='overlay'></div>
                        <div className="groupid-content">
                      <h5 className='group-id5'>Group Id</h5>
                      <div className="group-member">
                      <h5>Group Member  <span style={{background:' #044483',color:'white',width:'100vw'}}>0</span> </h5>
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
            
            <h4 className="appno-status">Application no SLK-123456</h4>
            <p className="status">Status</p>
            <div className="group-id-box">
            <h4>Group ID</h4> 
            <input type="text"/>
            <button className="btn"> Disbursed <img src={dropdown} alt="dropdown"/> </button>
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
              <input type="text" id="name" name="name" className="input-line" />
              </label>
              <label>
              <input type="text" id="name" name="name" className="input-line" />
                </label>
              <label>
              <input type="text" id="name" name="name" className="input-line" />
              </label>
              <label>
              <input type="text" id="name" name="name" className="input-line" />
              </label>
              <label>
              <input type="text" id="name" name="name" className="input-line" />
              </label>
              </div>
              </div>
             <div className="loanstatus-active">
              <h4>Loan Status <span>ACTIVE</span></h4>
              <p className="collection">Collection Agent</p>
            </div>
             <button className="btn2">R.Suresh Krishna <img className="dropdown" src={dropdownblack} alt="dropdown2"/> </button>
              
              <div className="group-details">
              <div className="group-information">
              <p >Loan Amount</p>
            <p>Loan Account Number</p>
            <p>Tenure</p>
            <p>Interest</p>
            <p>Due Date</p>
              </div>
              <div className="information">
              <label>
              <input type="text" id="name" name="name" className="input-line" />
              </label>
             <label>
             <input type="text" id="name" name="name" className="input-line" />
             </label>
             <label>
             <input type="text" id="name" name="name" className="input-line" />
             </label>
             <label>
             <input type="text" id="name" name="name" className="input-line" />
             </label>
              <label>
              <input type="date" id="name" name="name" className="input-line" />
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
                 <p>Bank Pass Book</p>
                </div>
                <div>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
                <input type="text" id="name" name="name" className="input-line" />
                <p className="not-attached">*Not Attached </p>
                <input type="text" id="name" name="name" className="input-line" />
                <br/>
                <div className="img-pdf">  <img src={pdf} alt="pdf"  /><p className="information">img.pdf</p></div>
                <input type="text" id="name" name="name" className="input-line" />
                </div>
              </div>
              <div className="add-loan-button">
                <button>ADD</button>
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
