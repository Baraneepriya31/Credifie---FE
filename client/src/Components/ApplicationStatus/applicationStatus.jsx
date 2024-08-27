import React, { useState, useEffect } from "react";
import './application-status.css';
import { FiDownload } from "react-icons/fi";
import dropdown from './Vector.png';
// import pdf from './pdf-file 1.png';
// import dropdownblack from './dropdown black.png';
import {CiSearch} from "react-icons/ci";
import closeicon from './ion_close.png';
import {MdOutlineMailOutline} from "react-icons/md";
import {FaFilePdf, FaFileExcel} from 'react-icons/fa';
import dropdownblack from './dropdown black.png';
import axios from'axios';




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
  const [applicationData, setApplicationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupData, setGroupData] = useState({});
  const [groupId, setAppId] = useState('');
  const [appstatuspopup, setAppstatusPopup] = useState(false);
  const [collectionagent2, setCollectionagent2] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [agents, setAgents] = useState([]);
  const [togglemodal2, settoggleModal2] = useState(false);
  const [appstatuspopup2, setAppstatusPopup2] = useState(false);
  const [appliedStatus, setAppliedStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAgent, setSelectedAgent] = useState('R.Suresh Krishna');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [file, setFile] = useState()
  const [uploadedFileURL, setUploadedFileURL] = useState(null)
  const [loanDetails,setLoanDetails] = useState({
     appStatus:'',
    groupID:'',
    groupName:'',
    groupLeader:{
      name: '',
      contactNumber: ''
    },
    members: '',
    groupLocation:'',
    panCard: '',
    photos: '',
    collectionAgent: '',

    loanamount:'',
    loanaccountnumber:'',
    tenure:'',
    interest:'',
    duedate:'',
    bankPassBook: '',
   });



  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.get('http://localhost:3008/getapplication');
        setApplicationData(response.data);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };
    fetchApplicationData();
  }, []);

  useEffect(() => {
    const savedVisibility = localStorage.getItem('isDivVisible');
    if (savedVisibility === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleGroupIdChange = (e) => setAppId(e.target.value);

  const fetchAndDisplayGroupDetails = async () => {
    console.log(`Fetching details for Group ID: ${groupId}`); 
    try {
      const response = await axios.get(`http://localhost:3008/getgroups/${groupId}`);
      setGroupData(response.data);
      setLoanDetails(response.data);
      // setApplicationData();
      //setModal(true);
    } catch (error) {
      console.error('Error fetching group details:', error.response ? error.response.data : error.message); // Log full error response
      setError(error.response ? error.response.data : error.message);
    }
  };


  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await fetchAndDisplayGroupDetails();
    }
  };


  // API endpoint to get group details
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get('http://localhost:3008/getgroups');
        setGroupData(response.data);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };
    fetchGroupData();
  }, []);


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

 const handleAgentSelect = (agent) => {
      setSelectedAgent(agent);
    };


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
    setopenShare(false);
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
      setPopup(false);
    }

    const Collectionagent2 = () => {
      setCollectionagent2(!collectionagent2);
    };
  
    if(collectionagent2) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    const toggleModal2 = (id) => {
      settoggleModal2(!togglemodal2);
      const application = applicationData.find((application) => application._id === id);
      setSelectedApplication(application);
    }

    const AppstatusPopup2 = () => {
      setAppstatusPopup2(!appstatuspopup2);
    };

    const AppstatusPopup = () => {
      setAppstatusPopup(!appstatuspopup);
    };
  
    if(appstatuspopup) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
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

    const GroupId = (id) => {
      setGroupId(!grouppopup);
      const application = applicationData.find((application) => application._id === id);
      setSelectedApplication(application);
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
  //   }
  // }

  const handleChange = (e, role, field, index=null) => {
    const { value } = e.target;
  
    if (role === 'loan') {
      setLoanDetails(prevDetails => ({
        ...prevDetails,
        [field]: value,
      }));
    }
    else {
        setLoanDetails(prevData => ({
            ...prevData,
            [field]: value,
        }));
    }
  }

    
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const filteredData = applicationData.filter(application =>
      application.groupLeader.name.toLowerCase().includes(searchQuery) ||
      application.applicationID.toLowerCase().includes(searchQuery)
      );

    const handleSubmit = async () => {
      try {
          await axios.post('http://localhost:3008/add-application', loanDetails);
          console.log(loanDetails);
          setButtonText("Submitted");
          setModal(!modal);
          alert('Application added successfully');
      } catch (error) {
          console.error('Error adding application:', error);
      }
    };

    const handleSubmitLoan = async () => {
      if (selectedApplication){
      try {
          const response = await axios.post(`http://localhost:3008/add-application/${selectedApplication._id}`, selectedApplication);
          if (response.data.message === 'Application added successfully'){ 
            // setLoanDetails({...response.data});
            setApplicationData();
            settoggleModal2(false);
          }
      } catch (error) {
          console.error('Error adding application:', error);
      }
    }
    };

    const handleFileChange = (event) =>{
      setFile(event.target.files[0]);
    }

    // const handleUpload = (event) =>{
    //     event.preventDefault()
    //     const url ='http://localhost:3008/add-application';
    //     const formData = new FormData();
    //     formData.append('file',file);
    //     formData.append('fileName',file.name);
    //     const config = {
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //     };
    //     axios.post(url, formData, config).then((response) => {
    //       setUploadedFileURL(response.data.fileUrl);
    //     });
    // }


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
                <input type="text" className="search-box" placeholder="Type here to search..." value={searchQuery} onChange={handleSearchChange}/><CiSearch className="search-icon"/>
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
          <span className="progress-value">{counter}%</span> 
          <span className="tick">&#10004;</span>
          </div>
          <span className="progress-text">Report send successfully</span>
          </div>
          </div>
      )} 
     

        <table className='table-ap'>
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
            {filteredData.map((application, index) => (
                <tr key={index}>
                    <td onClick={() => toggleModal2(application._id)}><div style={{color:'#0087F3',cursor:'pointer'}}>{application.applicationID}</div></td>
                    <td>28/08/2024</td>
                    <td onClick={() => GroupId(application._id)}><div style={{color:'#0087F3',cursor:'pointer'}}>{application.groupName}</div></td>                    
                    <td>{application.groupLeader.name}</td>
                    <td>{application.groupLeader.contactNumber}</td>
                    <td>-</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }}
  className="status-popup">{buttonText}</td>
                </tr>
                ))}

                {togglemodal2 && selectedApplication && (
                  <div className="modal">
                    <div onClick={toggleModal2} className="overlay"></div>
                    <div className="modal-content">
                      
                      <h4 className="appno-status">Application ID- {selectedApplication.applicationID}</h4>
                      <h4 className="appno-status">Group ID- {selectedApplication.groupID}</h4>

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
                          <p>{selectedApplication.groupName}</p>
                          <p>{selectedApplication.groupLeader.name}</p>
                          <p>{selectedApplication.groupLeader.contactNumber}</p>
                          <p>{selectedApplication.members}</p>
                          <p>{selectedApplication.groupLocation}</p>
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
                        <div className="img-pdf">
                          <input className="information" type="file" onChange={handleFileChange}/>
                        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
                        </div>   
                        <div className = "img-pdf">
                          <input className="information" type="file" onChange={handleFileChange}/>
                          {/* <button onClick={handleUpload}></button> */}
                        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
                        </div>
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
                        <div>
                      <input type="text" id="name" name="name" className="input-line1" value={loanDetails.loanaccountnumber} onChange={(e) => handleChange(e, 'loan', 'loanaccountnumber')}/>
                        </div>
                        <div>
                      <input type="text" id="name" name="name" className="input-line1" value={loanDetails.tenure} onChange={(e) => handleChange(e, 'loan', 'tenure')}/>
                        </div>
                        <div>
                      <input type="text" id="name" name="name" className="input-line1" value={loanDetails.interest} onChange={(e) => handleChange(e, 'loan', 'interest')}/>
                        </div>
                        <div>
                      <input type="date" id="name" name="name" className="input-line1" value={loanDetails.duedate} onChange={(e) => handleChange(e, 'loan', 'duedate')}/>
                        </div>
                        <div className="img-pdf">
                          <input className="information" type="file" onChange={handleFileChange}/>
                          {/* <button onClick={handleUpload}></button> */}
                        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
                        </div>  
                      </div>
                      </div>
                      </div>
                
              )}
                        <div className="add-loan-button">
                          <button onClick={handleSubmitLoan}>ADD</button>
                        </div>
                        <button className="close-modal" onClick={toggleModal2}>
                          <img src={closeicon} alt="icon" /></button>
                           
                         </div>
                       </div>
                )}
          
         </tbody>
      </table>
        
      
        {grouppopup && selectedApplication &&(
                      <div className='grouppopup-a'>
                        <div onClick={GroupId} className='overlay-g'></div>
                        <div className="groupid-content">
                      <h5 className='group-id5'>Group Id </h5>
                     
                      <div className="group-member">
                      <h5>Group Member  <span style={{background:' #044483',color:'white',width:'100vw'}}>{selectedApplication.members}</span> </h5>
                      <div className='application-status2'>
                       <h4> Application Status</h4>
                       <button className='pending'>Pending  
                         <img className="dropdown" src={dropdown} alt="dropdown" /> </button>
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
                       <td className='id-info'> {selectedApplication.groupID}</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Group Name</td>
                       <td  className='id-info'>{selectedApplication.groupName} &nbsp; </td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Group Leader</td>
                       <td  className='id-info'>- {selectedApplication.groupLeader.name} &nbsp; </td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Contact Number</td>
                       <td  className='id-info'>- {selectedApplication.groupLeader.contactNumber} &nbsp;</td>
                      </tr>
                    </table>
                   </div> 
                   <div className="table-2">
                    <table className='group-table'>
                      <tr>
                      <td className='id-details'>Loan Amount</td>
                      <td className='id-info'>- &nbsp; -</td>
                      </tr>
                     &nbsp;
                      <tr>
                       <td className='id-details'>Collection Agent</td>
                       <td  className='id-info'>- &nbsp; -</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Over Due</td>
                       <td  className='id-info'>- &nbsp;  -</td>
                      </tr>
                      &nbsp;
                      <tr>
                       <td className='id-details'>Loan Status</td>
                       <td  className='id-info'>- &nbsp;-</td>
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

{error && <p>Error: {error}</p>}
      {modal && groupData && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p className="status">Status</p>
            <div className="group-id-box">
              <h4>Group ID</h4> 
              <input
                type="text"
                value={groupId}
                onChange={handleGroupIdChange}
                onKeyDown={handleKeyDown}
                onClick={fetchAndDisplayGroupDetails}
              />
              <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={AppstatusPopup} className="btn">
                App Status <img src={dropdown} alt="dropdown" />
              </button>
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
              <div>
              <div className="information">
                <label>
                  <input type="text" id="name" name="name" className="input-lines" value={groupData.groupName || ''} />
                </label>
                <label>
                  <input type="text" id="name" name="name" className="input-lines" value={groupData.groupLeader?.name || ''} />
                </label>
                <label>
                  <input type="text" id="name" name="name" className="input-lines" value={groupData.groupLeader?.contactNumber || ''} />
                </label>
                <label>
                  <input type="text" id="name" name="name" className="input-lines" value={groupData.members?.length || ''} />
                </label>
                <label>
                  <input type="text" id="name" name="name" className="input-lines" value={groupData.groupLocation || ''} />
                </label>
              </div>
              </div>
            </div>
            <h4 className="group-info">Attachments</h4>
            <div className="group-details">
              <div className="group-information">
                <p>Pan card</p>
                <p>Photos</p>
                
              </div>
              <div>
                <div className="img-pdf">
                  <input className="information" type="file" onChange={handleFileChange}/>
                        {/* <button onClick={handleUpload}></button> */}
                        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
                </div>
                <div className="img-pdf">
                <input className="information" type="file" onChange={handleFileChange}/>
                        {/* <button onClick={handleUpload}></button> */}
                        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
                </div>
              </div>
            </div>
            <div className="add-loan-button">
              <button onClick={handleSubmit} >ADD</button>
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