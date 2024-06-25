import React from 'react';
import { BsSearch, BsDownload} from 'react-icons/bs';
import dropdown from './Vector.png';

function Group() {
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
              <button className="add-btn">Add Group   +</button>
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
                    <td>*Closed/2</td>
                    <td  className="loan-status">Submitted <img className="dropdown" src={dropdown} alt="dropdown" /></td>
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
                    <td>*Closed/2</td>
                    <td  className="loan-status">Submitted <img className="dropdown" src={dropdown} alt="dropdown" /></td>
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
                    <td>*Closed/2</td>
                    <td  className="loan-status">Submitted <img className="dropdown" src={dropdown} alt="dropdown" /></td>
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
                    <td>*Closed/2</td>
                    <td  className="loan-status">Submitted <img className="dropdown" src={dropdown} alt="dropdown" /></td>
                    <td><input type='checkbox'/></td>
                  </tr>
              
              </table>
             
            </div>
        </div>
    </div>
  )
}

export default Group;