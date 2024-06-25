import React, {useState} from 'react';
import { BsSearch, BsDownload} from 'react-icons/bs';
import dropdown from './Vector.png';

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
              <button className='disable-btn'>Disable</button>
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
                    <td  className="application-no">G.401</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>B. Vijay</td>
                    <td>Rs.25,000</td>
                    <td className='active-status'>*Active/3</td>
                    <td  className="loan-status">Submitted <img className="dropdown" src={dropdown} alt="dropdown" /></td>
                    <td><input type='checkbox'/></td>
                  </tr>
                  &nbsp;
                  <tr>
                    <td  className="application-no">G.402</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>N/A</td>
                    <td>Rs.25,000</td>
                    <td className='closed-status'>*Closed/2</td>
                    <td  className="loan-status2">Approved <img className="dropdown" src={dropdown} alt="dropdown" /></td>
                    <td><input type='checkbox'/></td>
                  </tr>
                  &nbsp;
                  <tr>
                    <td  className="application-no">G.403</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>B. Vijay</td>
                    <td>Rs.25,000</td>
                    <td className='active-status'>*Active/5</td>
                    <td  className="loan-status3">On-Process <img className="dropdown" src={dropdown} alt="dropdown" /></td>
                    <td><input type='checkbox'/></td>
                  </tr>
                  &nbsp;
                  <tr>
                    <td  className="application-no">G.404</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>N/A</td>
                    <td>Rs.25,000</td>
                    <td className='closed-status'>*Closed/4</td>
                    <td  className="loan-status2">Approved <img className="dropdown" src={dropdown} alt="dropdown" /></td>
                    <td><input type='checkbox'/></td>
                  </tr>
                  &nbsp;
                  <tr>
                    <td  className="application-no">G.405</td>
                    <td>Chennai Group</td>
                    <td>Vijay</td>
                    <td>+91 8907654321 </td>
                    <td>Rs.3,50,000</td>
                    <td>N/A</td>
                    <td>Rs.25,000</td>
                    <td className='closed-status'>Closed/2</td>
                    <td  className="loan-status2">Approved <img className="dropdown" src={dropdown} alt="dropdown" /></td>
                    <td><input type='checkbox'/></td>
                  </tr>
              </table>
             
            </div>

                   {addmodal && (
                    <div className='addmodal'>
                     <div  onClick={addgroup} className="overlay"></div>
                    </div>
                   )}

        </div>
    </div>
  )
}

export default Group;