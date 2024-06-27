import React, {useState} from 'react';
import { BsSearch, BsDownload} from 'react-icons/bs';
import dropdown from './Vector.png';
import closeicon from './ion_close.png';
import groupicon from './grpmem.png';
import leadicon from './grplead.png';
import contact from './contact.png'
import member from './grpmembers.png'
import alert from './alerticon.png'




function Group() {
            
        const [addmodal, setAddmodal] = useState(false);

        const addgroup = () =>{
          setAddmodal(!addmodal);
        }
        if(addmodal) {
          document.body.classList.add('active-modal')
        } else {
          document.body.classList.remove('active-modal')
        }
             
        
          const [rows, setRows] = useState([{ member: '', contact: '', pan: '' }]);
        
       
          const addrow = () => {
            setRows([...rows, { member: '', contact: '', pan: '' }]);
          };

          const handleChange = (index, field, value) => {
            const newRows = [...rows];
            newRows[index][field] = value;
            setRows(newRows);
          };
         
          const [Openmodal, setOpenModal] = useState(false);

          const OpenModal = () => {
            setOpenModal(!Openmodal);
          };
        
          if(Openmodal) {
            document.body.classList.add('active-modal')
          } else {
            document.body.classList.remove('active-modal')
          }
           
           
          const [buttonText, setButtonText,] = useState('Submitted');
          const [buttonColor, setButtonColor] = useState('#12c2e9');

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
              
            }else if (value === 'submitted') {
              setButtonText('Submitted');
              setButtonColor('#62B8FC');
            }
          }
           
          const [disablemodal, setDisableModal] = useState(false);

          const DisableModal = () => {
            setDisableModal(!disablemodal);
          };
        
          if(disablemodal) {
            document.body.classList.add('active-modal')
          } else {
            document.body.classList.remove('active-modal')
          }
           
          const [isConfirmed, setIsConfirmed] = useState(false);

         const handleConfirm = () => {
         setIsConfirmed(true);
  };

  const [grouppopup, setGroupId] = useState(false); 

  const GroupId = () => {
    setGroupId(!grouppopup);
  };

  if(grouppopup) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
   
       
  return(
    <div className='group'>
        <div className='total-group'>
            <h2>Total Group <span>0</span></h2>
        </div>
        <div className="group-container">
          <div className="group-btn">
            <div className="input-search">
            <input type='search' placeholder='Type here to search...' /> <BsSearch className="search-icon" />
            </div>
            <div>
              <button onClick={DisableModal} className='disable-btn'>Disable</button>
              <button onClick={addgroup} className="add-btn">Add Group   +</button>
              <button className='download-btn'>Download  <BsDownload className='download-icon' /> </button>
            </div>
            </div>
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
               
                  <tr>
                    <td onClick={GroupId} className="application-no">G.401</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>B. Vijay</td>
                    <td>Rs.25,000</td>
                    <td className='active-status'>*Active/3</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }}
         onClick={OpenModal} className="loan-status">{buttonText}
      <img className="dropdown" src={dropdown} alt="dropdown" /> </td>
                 
                    <td><input type='checkbox'/></td>
                  </tr>
                  &nbsp;
                  <tr>
                    <td  className="application-no">G.401</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>B. Vijay</td>
                    <td>Rs.25,000</td>
                    <td className='active-status'>*Active/3</td>
                    <td style={{ backgroundColor: buttonColor, color:'white' }}
         onClick={OpenModal} className="loan-status">{buttonText}
      <img className="dropdown" src={dropdown} alt="dropdown" /> </td>
                 
                    <td><input type='checkbox'/></td>
                  </tr>

                  {Openmodal && (
        <div className="openmodal3">
          <div className="modal-list">
            <div className="submitted">
            <input   className="radio-button" type="radio" name="status" value="submitted" onChange={handleRadioChange} />
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
            &nbsp;
                  
              </table>
             
            </div>
                      
                     {grouppopup && (
                      <div className='grouppopup'>
                        <div onClick={GroupId} className='overlay'></div>
                        <div className="groupid-content">
                      <h5>Group Id</h5>
                      <hr className="groupid-line" />
                      <div className="group-member">
                      <h5>Group Member  <span>0</span> </h5>
                      <div className='application-status2'>
                       <h5> Application Status</h5>
                       <button className='pending'>Pending  
                         <img className="dropdown" src={dropdown} alt="dropdown" /> </button>
                      </div>
                      </div>
                      <button className="close-modal" onClick={GroupId}>
              <img src={closeicon} alt="icon" />
            </button>
                   <div>
                    <table>
                      <tr>
                       <td>Group Id</td>
                       <td>-  G 401</td>
                      </tr>
                      <tr>
                       <td>Group Name</td>
                       <td>-  Chennai Group</td>
                      </tr>
                      <tr>
                       <td>Group Leader</td>
                       <td>-  Vijay</td>
                      </tr>
                      <tr>
                       <td>Contact Number</td>
                       <td>+ 91 7890123456</td>
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
            <label>Reason*</label>
            <input type='textarea' className="reason-input" />
            <br />
            <button className="disable-button">Disable</button>
            
          </>
        )}
                   </div>
                 
                    </div>
                   )}    
        </div>
    </div>
  )
}



export default Group;