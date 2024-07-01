import React, { useState } from "react";
import './application-status.css';
import { FiDownload } from "react-icons/fi";
import dropdown from './Vector.png';
import pdf from './pdf-file 1.png';
import dropdownblack from './dropdown black.png';
import { CiSearch } from "react-icons/ci";
import closeion from './ion_close.png';
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
            <div className="table-container">
             <div className="application-status-text">
                <p>Total Application</p>
            </div> 

            <div className="box-header">
                <div className="box1">
                  <div className="search-container">
                <input type="text" className="search-box" placeholder="Type here to search..." /><CiSearch className="search-icon"/>
                </div>
                <button className="add-application-button" onClick={toggleModal}>Add Loan Application +</button>
                <button className="download-button" onClick={Popup} >Download  <FiDownload /> </button>
                </div>

                {/* First popup for download and share */}
                {openPopup && (<div className="download-popup">
                  <div onClick={Popup} className="overlay"></div>
                  <div className="download-box">
                    <div className="close-icon">&times;</div>
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
       {share && (
        <div className="share-popup">
          <div onClick={closeShare} className="overlay-1"></div>
          <div className="share-box">
            <div className="loader">
              <div className="circle"></div>
              <div className="tick">&#10003;</div>
            </div>
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

            <table className='table1'>
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
                    <td><div style={{color:'#0087F3'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td><div style={{color:'#0087F3' }} >Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>

                <tr>
                    <td><div style={{color:'#0087F3'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td><div style={{color:'#0087F3' }} >Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>
                <tr>
                    <td><div style={{color:'#0087F3'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td><div style={{color:'#0087F3'}}>Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>
                <tr>
                    <td><div style={{color:'#0087F3'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td><div style={{color:'#0087F3' }}>Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>
                <tr>
                <td><div style={{color:'#0087F3'}}>CRD110279</div></td>
                <td>28/08/ 2024</td>
                <td><div style={{color:'#0087F3' }}>Ambai Group</div></td>
                <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td>submitted</td>
                </tr>
                <tr>
                    <td><div style={{color:'#0087F3'}}>CRD110279</div></td>
                    <td>28/08/ 2024</td>
                    <td><div style={{color:'#0087F3'}}>Ambai Group</div></td>
                    <td>Kannan S</td>
                    <td>+91 97905 64324</td>
                    <td>2,50,000</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }}
  onClick={OpenModal} className="loan-status">{buttonText}<img className="dropdown" src={dropdown} alt="dropdown" /> </td>
                </tr>
                
              {Openmodal && (
        <div className="openmodal">
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
            <input className="radio-button" type="radio" />
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
              <div className="add-loan-button">
                <button>ADD</button>
              </div>
            <button className="close-modal" onClick={toggleModal}>
              <img src={closeion} alt="icon" />
            </button>
          
          </div>
   
        </div>
      )}
      </div>
      </div>
    </div>
    );
}

export default ApplicationStatus;
