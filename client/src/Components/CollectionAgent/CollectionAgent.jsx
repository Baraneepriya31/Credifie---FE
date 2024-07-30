import React, {useState} from 'react';
import axios from 'axios';
import './CollectionAgent.css';
import { CiSearch} from 'react-icons/ci';
import closeicon from './ion_close.png';
import { FiDownload } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

function CollectionAgent () {
       
   
    const [addmodal, setAddmodal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);
    const [openPopup, setPopup] =useState(false);
    const [opensave, setopenDownload] =useState(false);
    const [opensend, setopenShare]=useState(false);
    const [share, setopensuccess] =useState(false);
    const [email, setEmail] = useState('');
    const [fileType, setFileType] = useState('');
    const [isEditMode, setIsEditMode] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]); 
    const [deleteRows, setDelete] = useState([]); 
    

    const addagent = () =>{
        setAddmodal(!addmodal);
      }
      if(addmodal) {
       document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
      const [agentDetails,setAgentDetails] = useState({
        firstName:'',
        lastName:'',
        contactnumber:'',
        pannumber:'',
        dateofbirth:'',
        gender:'',
        emailid:'',
        maritalstatus:'',
        totalexperience:'',
        highesteducation:'',
      });
      const handleChange = (e, role, field ) => {
        const { value } = e.target;
    
        if (role === 'agent') {
          setAgentDetails(prevDetails => ({
            ...prevDetails,
            [field]: value,
          }));
        } 
      };
      
      const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3008/add-agent', agentDetails);
            console.log(agentDetails);
            alert('agent added successfully');
            addagent();
        } catch (error) {
            console.error('Error adding agent:', error);
        }
      };
            
      const editagent = () =>{
        setEditmodal(!editmodal);
      }
      if(editmodal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }
      const [editData, setEditData] = useState({
        firstName: '',
        lastName: '',
        contactnumber: '',
        pannumber: '',
        dateofbirth: '',
        gender: '',
        emailid: '',
        maritalstatus: '',
        totalexperience: '',
        highesteducation: ''
      });
       
      const handleUpdate = (e, role, field ) => {
        const { value } = e.target;
    
        if (role === 'agent') {
          setEditData(prevDetails => ({
            ...prevDetails,
            [field]: value,
          }));
        } 
      };
      

      const handleUpdated = async (e) => {
        e.preventDefault();
        setIsEditMode(!isEditMode);
        try {
          const response = await axios.put('http://localhost:3008/update-agent/:id', editData);
          alert(response.data.message);
          editagent();
        } catch (error) {
          console.error('Error updating agent:', error);
          alert('Failed to update agent');
        }
      }
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
      
      const deleteAgent = async (id) => {
        try {
          setDelete(prevState => [...new Set([...prevState, ...selectedRows])]);
        setSelectedRows([]); 
          const response = await fetch(`http://localhost:3000/agents/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Agent deleted:', data);
        } catch (error) {
          console.error('Error deleting agent:', error);
        }
      };
      const handleCheckboxChange = (index) => {
        setSelectedRows(prevState => {
          if (prevState.includes(index)) {
            return prevState.filter(i => i !== index);
          } else {
            return [...prevState, index];
          }
        });
      };
      
      
       return (
        
        <div className='collectionagent'>
        <div className='collection-agent'>
             <h2>Collection Agents <span>0</span></h2>
         </div>
         <div className="agent-container">
          <div className="agents-btn">
            <div className="input-search">
            <input type="text"  placeholder="Type here to search..."/>
            <CiSearch className="search-icon"/>
            </div>
            <div>
              <button onClick={addagent}  className="add-button">Add Agent   +</button>
              <button  onClick={Popup} className="download-button"  >Download  <FiDownload />
               </button>
              <button onClick={deleteAgent} className='remove-btn'>Remove</button>
            </div>
            {addmodal && (
                    <div className='addmodal'>
                     <div  onClick={addagent} className="overlay"></div>
                     <div className='add-agent'>
                          <h4>Add Agent</h4>
                          <hr className='add-line'/>
                          <div className="group-flex">
                          <div className="agent-info">
                            <p className='first-name'>First Name</p>
                            <input type="text" name="firstname" className="input-line2"
         value={agentDetails.firstName} onChange={(e) => handleChange(e, 'agent', 'firstName')}/> 
                            
                          </div>
                          <div className='agent-info'>
                            <p className='last-name'>Last Name </p>
                            <input type="text" name="name" className="input-line2"
                             value={agentDetails.lastName} onChange={(e) => handleChange(e, 'agent', 'lastName')}/>
                          </div>
                         
                          </div>
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='last-name'>Contact number</p>
                            <input type="number" name="number" className="input-line2"
 value={agentDetails.contactnumber} onChange={(e) => handleChange(e, 'agent', 'contactnumber')}/>
                          </div>
                          <div className='agent-info' >
                            <p className='last-name'>Pan number </p>
                            <input type="text" name="name" className="input-line2"
                       value={agentDetails.pannumber} onChange={(e) => handleChange(e, 'agent', 'pannumber')}/>
                          </div>
                         
                          </div>
                          <div className="agent-flex2">
                          <div className="agent-info">
                            <p className='agent-info'>Date of Birth</p>
                            <input type="text" name="name" className="input-line2"
                       value={agentDetails.dateofbirth} onChange={(e) => handleChange(e, 'agent', 'dateofbirth')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Gender </p>
                            <select className="gender-select" name="gender" 
                            value={agentDetails.gender} onChange={(e) => handleChange(e, 'agent', 'gender')}>
                           <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                            </select>
                          </div>
                          </div>
                          
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='agent-info'>Email id</p>
                            <input type="text" name="name" className="input-line2"
          value={agentDetails.emailid} onChange={(e) => handleChange(e, 'agent', 'emailid')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Marital Status </p>
                     <select className="gender-select2" name="maritalstatus" 
                    value={agentDetails.maritalstatus} onChange={(e) => handleChange(e, 'agent', 'maritalstatus')}>
                <option value="">Select</option>
                <option value="Single">Single</option>
                   <option value="Married">Married</option>
                   <option value="Unmarried">Unmarried</option> 
                                   </select>
                          </div>
                          </div>
                         
                          <div className="agent-flex" >
                          <div className="agent-info">
                            <p className='agent-info'>Total experience</p>
                    <input type="text" name="name" className="input-line2"
 value={agentDetails.totalexperience} onChange={(e) => handleChange(e, 'agent', 'totalexperience')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Highest Education Degree </p>
                   <input type="text" name="name" className="input-line2"
 value={agentDetails.highesteducation} onChange={(e) => handleChange(e, 'agent', 'highesteducation')}/>
                             
                           </div>
                           
                           </div>
                        
                       
                           <button onClick={handleSubmit} className='add'>Add</button> 
                          <button className="close-modal" onClick={addagent}>
                       <img src={closeicon} alt="icon" />
            </button>
                   
                     </div>
                     </div>
                   
                    )}

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
                  type="email" id="email" value={email} onChange={handleEmailChange} required />
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
           {opensave && (
        <div className="share-popup">
          <div onClick={closeShare} className="overlay"></div>
          <div className="share-box">
            
          </div>
        </div>
      )}
          </div>
          <div>
              <table className='table2'>
                <th>Agent ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contact No</th>
                <th>No of Grps.Assigned</th>
                <th>Target for the week</th>
                <th>Amount Collected</th>
                <th>Select</th>
                &nbsp;
              
                <tr >
                    <td className="application-no" onClick={editagent}>CRDE101</td>
                    <td>Vijay</td>
                    <td>India</td>
                    <td>+91 8907654321 </td>
                    <td>25</td>
                    <td>Rs.2,50,000</td>
                    <td>Rs.25,000</td>
                    <td><input type='checkbox' 
                 checked={selectedRows.includes()}
                 onChange={() => handleCheckboxChange()}
                 delete={deleteRows.includes()}   /></td>
                  </tr>
                 
                  &nbsp;
                  <tr>
                    <td className="application-no">CRDE101</td>
                    <td>Vijay</td>
                    <td>India</td>
                    <td>+91 8907654321 </td>
                    <td>25</td>
                    <td>Rs.2,50,000</td>
                    <td>Rs.25,000</td>
                    <td><input type='checkbox'/></td>
                  </tr>
              </table>
                </div> 
          </div>
          {editmodal && (
                    <div className='addmodal'>
                     <div  onClick={editagent} className="overlay"></div>
                     <div className='add-agent'>
                          <h4>Edit Agent</h4>
                          <hr className='add-line'/>
                          <div className="group-flex">
                          <div className="agent-info">
                            <p className='first-name'>First Name</p>
         <input type="text" id="name" name="name" className="input-line2" 
        value={editData.firstName} onChange={(e) => handleUpdate(e, 'agent', 'firstName')}/>
                          </div>
                          <div className='agent-info'>
                            <p className='last-name'>Last Name </p>
                            <input type="text" id="name" name="name" className="input-line2"
         value={editData.lastName} onChange={(e) => handleUpdate(e, 'agent', 'lastName')}/>
                          </div>
                         
                          </div>
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='last-name'>Contact number</p>
                            <input type="number" id="name" name="number" className="input-line2"
          value={editData.contactnumber} onChange={(e) => handleUpdate(e, 'agent', 'contactnumber')}/>
                          </div>
                          <div className='agent-info' >
                            <p className='last-name'>Pan number </p>
                            <input type="number" id="name" name="name" className="input-line2"
          value={editData.pannumber} onChange={(e) => handleUpdate(e, 'agent', 'pannumber')}/>
                          </div>
                         
                          </div>
                          <div className="agent-flex2">
                          <div className="agent-info">
                            <p className='agent-info'>Date of Birth</p>
                            <input type="text" id="name" name="name" className="input-line2"
          value={editData.dateofbirth} onChange={(e) => handleUpdate(e, 'agent', 'dateofbirth')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Gender </p>
                            <select className="gender-select" name="gender" 
                            value={editData.gender} onChange={(e) => handleUpdate(e, 'agent', 'gender')}>
                           <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                            </select>
                          </div>
                          </div>
                          
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='agent-info'>Email id</p>
                            <input type="text" id="name" name="name" className="input-line2"
              value={editData.emailid} onChange={(e) => handleUpdate(e, 'agent', 'emailid')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Marital Status </p>
                            <select className="gender-select2" name="maritalstatus" 
                    value={editData.maritalstatus} onChange={(e) => handleUpdate(e, 'agent', 'maritalstatus')}>
                <option value="">Select</option>
                <option value="Single">Single</option>
                   <option value="Married">Married</option>
                   <option value="Unmarried">Unmarried</option> 
                                   </select>
                          </div>
                          </div>
                         
                          <div className="agent-flex" >
                          <div className="agent-info">
                            <p className='agent-info'>Total experience</p>
                           
                            <input type="text" id="name" name="name" className="input-line2"
      value={editData.totalexperience} onChange={(e) => handleUpdate(e, 'agent', 'totalexperience')} />
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Highest Education Degree </p>
                           
                             <input type="text" id="name" name="name" className="input-line2"
      value={editData.highesteducation} onChange={(e) => handleUpdate(e, 'agent', 'highesteducation')}/>
                           </div>
                           
                           </div>
                        
                       
                           <button className='add' onClick={handleUpdated}>
                            {isEditMode ? 'Edit' : 'Save'}</button> 
                          <button className="close-modal" onClick={editagent}>
                       <img src={closeicon} alt="icon" />
            </button>
                   
                     </div>
                     </div>
                   
                    )}

         </div>
       )

}

export default CollectionAgent;