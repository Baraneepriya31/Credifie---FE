  import React from "react";

  import 
  { BsCalendar2Date}
   from 'react-icons/bs'
   import iconimage from './Group 385.png'
   import rectangle from './Rectangle 257.png'
   import rectangle2 from './Rectangle 258.png'
   import rectangle3 from './Rectangle 259.png'

    const Statusbar = (props) => {
    const {score} = props;
      
    
     const calcColor = (percent, start, end) => {
        let a = percent * 100,
        b = (end - start) + a,
        c = b+start;

        return "hsl("+ c + ", 100%, 50%)";
     }
    

    // return (
    //      <CircularProgress
    //      value={score}
    //     text={'$ {value}'}
    //     circleRatio = {2}
    //     styles ={ {
    //         trail: {
    //             strokeLinecap:"butt",
    //             transform:"rotate(360deg)",
    //             transformOrigin:"center center",
    //         },
    //          path: {
    //             strokeLinecap:"butt",
    //             transform:"rotate(360deg)",
    //             transformOrigin:"center center",
    //             // stroke: calcColor(value , 0, 120),
    //          },
    //          text: {
    //             fill:"#ddd",
    //          },
    //         }}
    //         strokeWidth={20}

        
    //     />

    // )
     
    }

  function Home() {
  
      const data = [
          {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
        ];
       
  
    return (
      <main className='main-container'>
          <div className='main-title'>
              <h3>Current Months</h3>
              <h2>Last 3 Months</h2>
              <h2>Last 6 Months</h2>
    
              <h2 className="date">Select Date      <BsCalendar2Date className="date-icon"/></h2>
              </div>
            
            <h4 className="due-date">31st Aug 2023 - 30th Sept 2023</h4>
            
          <div className='main-cards'>
              <div className='card'>
                  <div className='card-inner'>
            <img className="rectangle" src={rectangle} alt="shape" width="40px" height="50px"/> 
                  <img src={iconimage} alt="icon" className="card-icon" />
                      <h3>Amount Disbursed</h3>
                  </div>
                  <h1 className="amount">Rs.3,50,000</h1>
                  <p className="due-from">To 150 groups</p>
                 
              </div>
              <div className='card'>
                  <div className='card-inner'>
                  <img className="rectangle" src={rectangle2} alt="shape" width="40px" height="50px"/> 
                  <img src={iconimage} alt="icon" className="card-icon" />
                      <h3>Amount Redeemed</h3> 
                  </div>
                  <h1 className="amount">Rs.3,50,000</h1>
                  <p className="due-from">To 150 groups</p>
                 
              </div>
              <div className='card'>
                  <div className='card-inner'>
                  <img className="rectangle" src={rectangle3} alt="shape" width="40px" height="50px"/> 
                  <img src={iconimage} alt="icon" className="card-icon" />
                      <h3>Total Overdue Loans</h3>
                  </div>
                  <h1 className="amount">Rs.3,50,000</h1>
                  <p className="due-from">To 150 groups</p>
                 
                  
              </div>
              
          </div>
             
             <div className="content">
            <div className="application-status">
                <h3>Application</h3>
                <hr />
            </div>
            <div className="recent-application">
              <h3>Recent Application</h3>
              <table>
                <th>Application No.</th>
                <th>SHG Name</th>
                <th>Loan Amount</th>
                <th>Phone No.</th>
                <th>Collection Agent</th>
                <th>Loan Status</th>
                <tr>
                  <td>SLK-123456</td>
                  <td>Magalir Matum</td>
                  <td>Rs.2,50,000</td>
                  <td>+91 980765421</td>
                  <td>N/A</td>
                  <td>Submitted</td>
                </tr>
              </table>

            </div>
             </div>


      </main>
    )
  }
  
  export default Home