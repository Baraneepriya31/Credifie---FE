import React, {useState,useEffect} from 'react';
import './CollectionAgent.css';
import { BsSearch} from 'react-icons/bs';
import closeicon from './ion_close.png';
import { FiDownload } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import axios from "axios";


function CollectionAgent () {

   
    const [addmodal, setAddmodal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);
    const [openPopup, setPopup] =useState(false);
    const [opensave, setopenDownload] =useState(false);
    const [opensend, setopenShare]=useState(false);
    const [share, setopensuccess] =useState(false);
    const [email, setEmail] = useState('');
    const [fileType, setFileType] = useState('');
    const [selects, setSelects] = useState();
    const [selects2, setSelects2] = useState();
    const [isEditMode, setIsEditMode] = useState(true);
    const [agentData,setAgentData] = useState([]);
    
    const addagent = () =>{
        setAddmodal(!addmodal);
      }
      if(addmodal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

      const editagent = () =>{
        setEditmodal(!editmodal);
      }
      if(editmodal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
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
           
      const handleButtonClick = () => {
        setIsEditMode(!isEditMode);
      };


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
        console.log("Handle change working")
    
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

      useEffect(() =>{
      const fetchAgentData = async () => {
      try{
         const response = await axios.get('http://localhost:3008/getagents');
         setAgentData(response.data);
        } catch(error){
        console.error('Error fetching agent data:',error)
        }
      };
      fetchAgentData();
      }, []);
    
  
       return (
        
        <div className='collectionagent'>
        <div className='collection-agent'>
             <h2>Collection Agents <span>0</span></h2>
         </div>
         <div className="agent-container">
          <div className="agents-btn">
            <div className="input-search">
            <input type='search' placeholder='Type here to search...' /> <BsSearch className="search-icon" />
            </div>
            <div>
              <button onClick={addagent}  className="add-button">Add Agent   +</button>
              <button  onClick={Popup} className="download-button"  >Download  <FiDownload />
               </button>
              <button  className='remove-btn'>Remove</button>
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
                            <input type="text" name="firstname" className="input-line2" value={agentDetails.firstName} onChange={(e) => handleChange(e, 'agent', 'firstName')}/> 
                            
                          </div>
                          <div className='agent-info'>
                            <p className='last-name'>Last Name </p>
                            <input type="text" name="name" className="input-line2" value={agentDetails.lastName} onChange={(e) => handleChange(e, 'agent', 'lastName')}/>
                          </div>
                         
                          </div>
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='last-name'>Contact number</p>
                            <input type="number" name="number" className="input-line2" value={agentDetails.contactnumber} onChange={(e) => handleChange(e, 'agent', 'contactnumber')}/>
                          </div>
                          <div className='agent-info' >
                            <p className='last-name'>Pan number </p>
                            <input type="text" name="name" className="input-line2" value={agentDetails.pannumber} onChange={(e) => handleChange(e, 'agent', 'pannumber')}/>
                          </div>
                         
                          </div>
                          <div className="agent-flex2">
                          <div className="agent-info">
                            <p className='agent-info'>Date of Birth</p>
                            <input type="text" name="name" className="input-line2" value={agentDetails.dateofbirth} onChange={(e) => handleChange(e, 'agent', 'dateofbirth')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Gender </p>
                            <select className="gender-select" name="gender" value={agentDetails.gender} onChange={(e) => handleChange(e, 'agent', 'gender')}>
                           <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                            </select>
                          </div>
                          </div>
                          
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='agent-info'>Email id</p>
                            <input type="text" name="name" className="input-line2" value={agentDetails.emailid} onChange={(e) => handleChange(e, 'agent', 'emailid')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Marital Status </p>
                     <select className="gender-select2" name="maritalstatus" value={agentDetails.maritalstatus} onChange={(e) => handleChange(e, 'agent', 'maritalstatus')}>
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
                    <input type="text" name="name" className="input-line2" value={agentDetails.totalexperience} onChange={(e) => handleChange(e, 'agent', 'totalexperience')}/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Highest Education Degree </p>
                   <input type="text" name="name" className="input-line2" value={agentDetails.highesteducation} onChange={(e) => handleChange(e, 'agent', 'highesteducation')}/>
                             
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
                  {agentData.map((agent, index) =>(
                  <tr key={index}>
                    <td className="application-no">CRDE101</td>
                    <td>{agent.firstName}</td>
                    <td>-</td>
                    <td>{agent.contactnumber} </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td><input type='checkbox'/></td>
                  </tr>
                  ))}
              </table>
                </div> 
          </div>
          {editmodal && (
                    <div className='addmodal'>
                     <div  onClick={editagent} className="overlay"></div>
                     <div className='add-agent'>
                          <h4>Add Agent</h4>
                          <hr className='add-line'/>
                          <div className="group-flex">
                          <div className="agent-info">
                            <p className='first-name'>First Name</p>
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='agent-info'>
                            <p className='last-name'>Last Name </p>
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                         
                          </div>
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='last-name'>Contact number</p>
                            <input type="number" id="name" name="number" className="input-line2"/>
                          </div>
                          <div className='agent-info' >
                            <p className='last-name'>Pan number </p>
                           
                            <input type="number" id="name" name="name" className="input-line2"/>
                          </div>
                         
                          </div>
                          <div className="agent-flex2">
                          <div className="agent-info">
                            <p className='agent-info'>Date of Birth</p>
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Gender </p>
                            {/* <img src={dropdowngrey} alt="gender" /> */}
                            <select className="gender-select" value={selects} onChange={e => setSelects (e.target.value)} >
                                  <option></option>
                                   <option>Male</option>
                                   <option>Female</option>
                                   </select>
                          </div>
                          </div>
                          
                          <div className="agent-flex">
                          <div className="agent-info">
                            <p className='agent-info'>Email id</p>
                            <input type="text" id="name" name="name" className="input-line2"/>
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Marital Status </p>
                            <select className="gender-select2" value={selects2} onChange={e => setSelects2 (e.target.value)} >
                                  <option></option>
                                   <option>Single</option>
                                   <option>Married</option>
                                   <option>Unmarried</option>
                                   </select>
                          </div>
                          </div>
                         
                          <div className="agent-flex" >
                          <div className="agent-info">
                            <p className='agent-info'>Total experience</p>
                           
                            <input type="text" id="name" name="name" className="input-line2"
                          />
                          </div>
                          <div className='last-name'>
                            <p className='agent-info'>Highest Education Degree </p>
                           
                             <input type="text" id="name" name="name" className="input-line2"
                             />
                           </div>
                           
                           </div>
                        
                       
                           <button className='add' onClick={handleButtonClick}>
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