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
    const [openPopup, setPopup] =useState(false);
    const [opensave, setopenDownload] =useState(false);
    const [opensend, setopenShare]=useState(false);
    const [share, setopensuccess] =useState(false);
    const [email, setEmail] = useState('');
    const [fileType, setFileType] = useState('');
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [totalCollectionAgents, setTotalCollectionAgents ] = useState(0);
    const [searchQuery, setSearchQuery]=useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    // const [deleteRows, setDelete] = useState([]); 
    

    
    const addagent = () =>{
        setAddmodal(!addmodal);
      }
      if(addmodal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

      useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const response = await axios.get('http://localhost:3008/getagents');
            setAgents(response.data);
            setTotalCollectionAgents(response.data.length);
        } catch (error) {
            console.error('Error fetching agents:', error);
        }
    };

    const editAgent = (id) => {
      const agent = agents.find((agent) => agent._id === id);
      setSelectedAgent(agent);
      setEditModal(true);
  };

    const closeEditModal = () => {
        setEditModal(false);
        setSelectedAgent(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedAgent(prevState => ({
            ...prevState,
            [name]: value
        }));
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
           
      const handleButtonClick = async () => {
        if (selectedAgent) {
            try {
                const response = await axios.put(`http://localhost:3008/update-agent/${selectedAgent._id}`, selectedAgent);
                if (response.data.message === 'Agent updated successfully') {
                    fetchAgents();
                    setEditModal(false);
                }
            } catch (error) {
                console.error('Error updating agent:', error);
            }
        }
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
        console.log("Handle change working");
    
        if (role === 'agent') {
          setAgentDetails(prevDetails => ({
            ...prevDetails,
            [field]: value,
          }));
        } 
      };

      const filteredData = agents.filter(agent =>
        (agent.firstName && agent.firstName.toLowerCase().includes(searchQuery)) ||
        (agent.contactnumber && agent.contactnumber.toString().includes(searchQuery))
    );
    

      const handleSearchChange=(event)=>{
        setSearchQuery(event.target.value)
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
    
      const deleteAgent = async (id) => {
        try {
          await axios.delete(`http://localhost:3008/agents/${id}`);
          fetchAgents(); 
        } catch (error) {
          console.error('Error deleting agent:', error);
        }
      };
    
      const handleDeleteSelected = () => {
        selectedRows.forEach((index) => {
          const agentId = agents[index]._id;
          deleteAgent(agentId);
        });
        setSelectedRows([]); 
      };
      
      const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3008/add-agent', agentDetails);
            if (response.data.message === 'Agent added successfully') {
                fetchAgents();
                setAddmodal(false);
                setAgentDetails({
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
            }
        } catch (error) {
            console.error('Error adding agent:', error);
        }
    };
      
  
       return (

        <div className='collectionagent'>
        <div className='collection-agent'>
             <h2>Collection Agents <span>{totalCollectionAgents}</span></h2>
         </div>
         <div className="agent-container">
          <div className="agents-btn">
            <div className="input-search">
            <input type='search' placeholder='Type here to search...' value={searchQuery} onChange={handleSearchChange}/> <BsSearch className="search-icon" />
            </div>
            <div>
                <button onClick={addagent} className="add-button">Add Agent +</button>
                <button className="download-button">Download <FiDownload /></button>
                <button className="remove-btn" onClick={handleDeleteSelected}>Remove</button>
            </div>

            {addmodal && (
                <div className='addmodal'>
                    <div onClick={addagent} className="overlay"></div>
                    <div className='add-agent'>
                        <h4>Add Agent</h4>
                        <hr className='add-line' />
                        <div className="group-flex">
                            <div className="agent-info">
                                <p className='first-name'>First Name</p>
                                <input type="text" name="firstname" className="input-line2" value={agentDetails.firstName} onChange={(e) => handleChange(e, 'agent', 'firstName')} />
                            </div>
                            <div className='agent-info'>
                                <p className='last-name'>Last Name</p>
                                <input type="text" name="name" className="input-line2" value={agentDetails.lastName} onChange={(e) => handleChange(e, 'agent', 'lastName')} />
                            </div>
                        </div>
                        <div className="agent-flex">
                            <div className="agent-info">
                                <p className='last-name'>Contact number</p>
                                <input type="number" name="number" className="input-line2" value={agentDetails.contactnumber} onChange={(e) => handleChange(e, 'agent', 'contactnumber')} />
                            </div>
                            <div className='agent-info'>
                                <p className='last-name'>Pan number</p>
                                <input type="text" name="name" className="input-line2" value={agentDetails.pannumber} onChange={(e) => handleChange(e, 'agent', 'pannumber')} />
                            </div>
                        </div>
                        <div className="agent-flex2">
                            <div className="agent-info">
                                <p className='agent-info'>Date of Birth</p>
                                <input type="text" name="name" className="input-line2" value={agentDetails.dateofbirth} onChange={(e) => handleChange(e, 'agent', 'dateofbirth')} />
                            </div>
                            <div className='last-name'>
                                <p className='agent-info'>Gender</p>
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
                                <input type="text" name="name" className="input-line2" value={agentDetails.emailid} onChange={(e) => handleChange(e, 'agent', 'emailid')} />
                            </div>
                            <div className='last-name'>
                                <p className='agent-info'>Marital Status</p>
                                <select className="gender-select2" name="maritalstatus" value={agentDetails.maritalstatus} onChange={(e) => handleChange(e, 'agent', 'maritalstatus')}>
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                </select>
                            </div>
                        </div>
                        <div className="agent-flex">
                            <div className="agent-info">
                                <p className='agent-info'>Total experience</p>
                                <input type="text" name="name" className="input-line2" value={agentDetails.totalexperience} onChange={(e) => handleChange(e, 'agent', 'totalexperience')} />
                            </div>
                            <div className='last-name'>
                                <p className='agent-info'>Highest Education Degree</p>
                                <input type="text" name="name" className="input-line2" value={agentDetails.highesteducation} onChange={(e) => handleChange(e, 'agent', 'highesteducation')} />
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
                <table className='table3'>
                    <thead>
                        <tr>
                            <th>Agent ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Contact No</th>
                            <th>No of Grps.Assigned</th>
                            <th>Target for the week</th>
                            <th>Amount Collected</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((agent, index) => (
                            <tr key={agent._id}>
                                <td className="application-no" onClick={() => editAgent(agent._id)}>{agent.agentID}</td>
                                <td>{agent.firstName}</td>
                                <td>-</td>
                                <td>{agent.contactnumber}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td><input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editModal && selectedAgent && (
                <div className='addmodal'>
                    <div onClick={closeEditModal} className="overlay"></div>
                    <div className='add-agent'>
                        <h4>Edit Agent</h4>
                        <hr className='add-line' />
                        <div className="group-flex">
                            <div className="agent-info">
                                <p className='first-name'>First Name</p>
                                <input type="text" name="firstName" className="input-line2" value={selectedAgent.firstName} onChange={handleInputChange} />
                            </div>
                            <div className='agent-info'>
                                <p className='last-name'>Last Name</p>
                                <input type="text" name="lastName" className="input-line2" value={selectedAgent.lastName} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="agent-flex">
                            <div className="agent-info">
                                <p className='last-name'>Contact number</p>
                                <input type="number" name="contactnumber" className="input-line2" value={selectedAgent.contactnumber} onChange={handleInputChange} />
                            </div>
                            <div className='agent-info'>
                                <p className='last-name'>Pan number</p>
                                <input type="text" name="pannumber" className="input-line2" value={selectedAgent.pannumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="agent-flex2">
                            <div className="agent-info">
                                <p className='agent-info'>Date of Birth</p>
                                <input type="text" name="dateofbirth" className="input-line2" value={selectedAgent.dateofbirth} onChange={handleInputChange} />
                            </div>
                            <div className='last-name'>
                                <p className='agent-info'>Gender</p>
                                <select className="gender-select" name="gender" value={selectedAgent.gender} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="agent-flex">
                            <div className="agent-info">
                                <p className='agent-info'>Email id</p>
                                <input type="text" name="emailid" className="input-line2" value={selectedAgent.emailid} onChange={handleInputChange} />
                            </div>
                            <div className='last-name'>
                                <p className='agent-info'>Marital Status</p>
                                <select className="gender-select2" name="maritalstatus" value={selectedAgent.maritalstatus} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                </select>
                            </div>
                        </div>
                        <div className="agent-flex">
                            <div className="agent-info">
                                <p className='agent-info'>Total experience</p>
                                <input type="text" name="totalexperience" className="input-line2" value={selectedAgent.totalexperience} onChange={handleInputChange} />
                            </div>
                            <div className='last-name'>
                                <p className='agent-info'>Highest Education Degree</p>
                                <input type="text" name="highesteducation" className="input-line2" value={selectedAgent.highesteducation} onChange={handleInputChange} />
                            </div>
                        </div>
                        <button onClick={handleButtonClick} className='add'>SAVE</button>
                        <button className="close-modal" onClick={closeEditModal}>
                            <img src={closeicon} alt="icon" />
                        </button>
                    </div>
                </div>
            )}

         </div>
         </div>
       )

}

export default CollectionAgent;