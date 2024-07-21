import React, {useState} from 'react';
import { CiSearch } from "react-icons/ci";
import dropdown from './Vector.png';
import closeicon from './ion_close.png';
import groupicon from './grpmem.png';
import leadicon from './grplead.png';
import contact from './contact.png'
import member from './grpmembers.png'
import alert from './alerticon.png'
import { FiDownload } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import './Group.css';



function Group() {
            
  const [addmodal, setAddmodal] = useState(false);
  const [rows, setRows] = useState([{ member: '', contact: '', pan: '' }]);
  const [buttonText, setButtonText,] = useState('Pending');
  const [buttonColor, setButtonColor] = useState('#12c2e9');
  const [disablemodal, setDisableModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [Openmodal, setOpenModal] = useState(false);
  const [grouppopup, setGroupId] = useState(false); 
  const [openPopup, setPopup] =useState(false);
  const [opensave, setopenDownload] =useState(false);
  const [opensend, setopenShare]=useState(false);
  const [share, setopensuccess] =useState(false);
  const [email, setEmail] = useState('');    
  const [fileType, setFileType] = useState('');
  const [selectedRows, setSelectedRows] = useState([]); // Row indexes to select
  const [disabledRows, setDisabledRows] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');       
              
  const data = [
    { id: 1, name: 'John Doe', age: 28 },
  ];
                  
  const addgroup = () =>{
    setAddmodal(!addmodal);
  }
  if(addmodal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
      
    const addrow = () => {
      setRows([...rows, { member: '', contact: '', pan: '' }]);
    };
        
    const handleChange = (index, field, value) => {
      const newRows = [...rows];
      newRows[index][field] = value;
      setRows(newRows);
    };
          
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredData = data.filter(row => 
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.age.toString().includes(searchQuery)
    );
  

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
      } else if (value === 'aknowledged') {
        setButtonText('Aknowledged');
        setButtonColor(' #FFBE0B');
      } else if (value === 'deadline') {
        setButtonText('Deadline');
        setButtonColor('orange');
      }else if (value === 'inprogress') {
        setButtonText('On-Process');
        setButtonColor('#FFBE0B');
        
      }else if (value === 'pending') {
        setButtonText('Pending');
        setButtonColor('#62B8FC');
      }
    }
      
    const DisableModal = () => {
      setDisableModal(!disablemodal);
    };
  
    if(disablemodal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
      

    const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const GroupId = () => {
    setGroupId(!grouppopup);
  };

  if(grouppopup) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
                
           
  const handleCheckboxChange = (index) => {
    setSelectedRows(prevState => {
      if (prevState.includes(index)) {
        return prevState.filter(i => i !== index);
      } else {
        return [...prevState, index];
      }
    });
  };

  const disableSelectedRows = () => {
    setDisabledRows(prevState => [...new Set([...prevState, ...selectedRows])]);
    setSelectedRows([]); // Clear selected rows after disabling
  };


         
  

  return(
    <div className='group'>
       <div className='total-group'>
            <h2>Total Group <span>0</span></h2>
           
        </div>
        <div className="group-container">
          <div className="group-btn">
            <div className="input-search">
            <input type="text"  placeholder="Type here to search..."
            value={searchQuery}
            onChange={handleSearchChange}  />
            <CiSearch className="search-icon"/>
            
            </div>
            <div>
              <button onClick={DisableModal} className='disable-btn'>Disable</button>
              <button onClick={addgroup} className="add-btn">Add Group   +</button>
              <button className="download-button" onClick={Popup} >Download  <FiDownload /> </button>
            </div>
          </div>
            {/* First popup for download and share */}
            {openPopup && (<div className="download-popup">
                  <div onClick={Popup} className="overlay"></div>
                  <div className="download-box">
                    <div onClick={Popup} className="close-icon">&times;</div>
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
            
            <div>
              <table className='table2'>
              
                 
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Group Leader</th>
                <th>Contact No</th>
                <th>Loan Amount</th>
                <th>Collection Agent</th>
                <th>Over Due</th>
                <th>Loan Status</th>
                <th>Application Status</th>
                <th>Select</th>
                &nbsp;
               {filteredData.map((row, index) => (
                  <tr key={row.id}
                  className={disabledRows.includes(index) ? 'disabled' : ''}
                  style={{ backgroundColor: disabledRows.includes(index)
                     ? '#d1d1d5' : 'transparent' }}>
                    <td onClick={GroupId} className="application-no">G.401</td>
                    <td>Chennai Group</td>
                    <td value={row.name} disabled={disabledRows.includes(index)} readOnly>
                      B.Vijay
                    </td>
                    <td type="number" value={row.age} disabled={disabledRows.includes(index)} readOnly>
                    9087654321
                    </td>
                    <td>Rs.3,50,000</td>
                    <td>B. Vijay</td>
                    <td>Rs.25,000</td>
                    <td className='active-status'>*Active/3</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }}
         onClick={OpenModal} className="loan-status">{buttonText}
      <img className="dropdown" src={dropdown} alt="dropdown" /> </td>
                 
                    <td><input  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  disabled={disabledRows.includes(index)}/></td>
                  </tr>
                 
                ))}
                 &nbsp;&nbsp;
                  
                  {Openmodal && (
        <div className="openmodal3">
          <div className="modal-list">
            <div className="submitted">
            <input   className="radio-button" type="radio" name="status" value="pending" onChange={handleRadioChange} />
            <p className="submit" >Submitted</p>
            </div>
            <div className="submitted">
            <input className="radio-button" type="radio" name="status" value="aknowledged" onChange={handleRadioChange} />
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
           
                  
              </table>
              </div>
            </div>
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

                   {addmodal && (
                    <div className='addmodal'>
                     <div  onClick={addgroup} className="overlay"></div>
                     <div className='add-group'>
                          <h4>Add Group</h4>
                          <hr className='add-line'/>
                          <div>
                            <p className='group-name'>Group Name</p>
                    <img src={groupicon} alt='group' className='name-icon' />
                             <input type="text" id="name" name="name" className="input-line1"/> 
                           
                          </div>
                          <div className="group-flex">
                          <div className="groupleader">
                            <p className='group-leader'>Group leader</p>
                            <img src={leadicon} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='contactnumber'>
                            <p className='group-leader'>Contact number </p>
                            <img src={contact} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div>
                            <p className='group-leader'>Pan number </p>
                     <input type="text" id="name" name="name" className="input-line"/>
                           
                          </div>
                          </div>
                          <div className="group-flex">
                          <div className="groupleader">
                            <p className='group-leader'>Sub leader</p>
                            <img src={leadicon} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='contactnumber'>
                            <p className='group-leader'>Contact number </p>
                            <img src={contact} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div>
                            <p className='group-leader'>Pan number </p>
                     <input type="text" id="name" name="name" className="input-line"/>
                           
                          </div>
                          </div>
                          <div className="group-flex2">
                          <div className="groupleader">
                            <p className='group-leader'>Group member</p>
                            <img src={member} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='contactnumber'>
                            <p className='group-leader'>Contact number </p>
                            <img src={contact} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div>
                            <p className='group-leader'>Pan number </p>
                            <div></div>
                            <input type="text" id="name" name="name" className="input-line"/>
                          </div>
                          </div>
                         
                          <div className="group-flex">
                          <div className="groupleader">
                            <p className='group-leader'>Group member</p>
                            <img src={member} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='contactnumber'>
                            <p className='group-leader'>Contact number </p>
                            <img src={contact} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div>
                            <p className='group-leader'>Pan number </p>
                            <div></div>
                            <input type="text" id="name" name="name" className="input-line"/>
                          </div>
                          </div>
                          {rows.map((row,index) => (
                          <div className="group-flex" key={index}>
                          <div className="groupleader">
                            <p className='group-leader'>Group member</p>
                            <img src={member} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"
                            value={row.member} onChange={(e) => handleChange(index, 'member', 
                              e.target.value )}/>
                          </div>
                          <div className='contactnumber'>
                            <p className='group-leader'>Contact number </p>
                            <img src={contact} alt='group' className='name-icon2'   />
                            <input type="text" id="name" name="name" className="input-line2"
                            value={row.contact} onChange={(e) => handleChange(index, 'contact',
                              e.target.value )}/>
                          </div>
                          <div>
                            <p className='group-leader'>Pan number </p>
                            <div></div>
                            <input type="text" id="name" name="name" className="input-line"
                            value={row.pan} onChange={(e) => handleChange(index, 'pan', e.target.value)}/>
                          </div>
                          </div>
                        ))}
                          <button className='add-more' onClick={addrow}>+ Add more</button>
                           <button className='add'>Add</button> 
                          <button className="close-modal" onClick={addgroup}>
              <img src={closeicon} alt="icon" />
            </button>
          
                     </div>
                    </div>
                   )}

                   {disablemodal && (
                    <div className='disablemodal'>
                    <div onClick={DisableModal} className="overlay"></div>
                   <div className="disable-content">
                         <h4 className='groupid'>Group ID</h4> 
                         <img src={alert} alt="alert" className='alert' />
                         <p className='disable'>Disable</p>
                         <p className="disablepara">
                           {isConfirmed ? 'Are you sure?' : 'Do you want to disable this group?'} 
                          </p>
                     
                           <div className="disable-buttons">
                          
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
            <button onClick={DisableModal} className='cancel-button'> {isConfirmed ? 'Exit' : 'Cancel'}</button>
                           </div>
                           {isConfirmed && (
          <>
            <label className="label-reason">Reason*</label>
            <input type='textarea' className="reason-input" />
            <br />
            <button className="disable-button" onClick={disableSelectedRows}>Disable</button>
            
          </>
        )}
      
        </div>
        </div>
        )}
        </div>
    
  )

 }




export default Group;
