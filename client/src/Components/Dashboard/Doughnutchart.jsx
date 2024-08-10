// src/DoughnutChart.js

 import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement  } from 'chart.js';
import { useState,useEffect } from 'react';

ChartJS.register(ArcElement );

const DoughnutChart = () => {
    const [data, setChartData] = useState( {
        datasets: [
            {
                label: 'Application Status',
                data: [25, 25, 50], 
                backgroundColor: ['#f44336', '#ffeb3b','#4caf50'], 
                hoverBackgroundColor: ['#ef5350', '#ffecb3' ,'#66bb6a']
            }
        ]
    });
      
    useEffect(() => {
        
        fetch('/api/application-status')
            .then(response => response.json())
            .then(data => {
                const statusCounts = {
                    verified: data.verifiedCount,
                    inProgress: data.inProgressCount,
                    rejected: data.rejectedCount
                };
                  
                setChartData({
                    datasets: [
                        {
                            label: 'Application Status',
                            data: [statusCounts.verified, statusCounts.inProgress, statusCounts.rejected],
                            backgroundColor: ['#f44336', '#ffeb3b', '#4caf50'],
                            hoverBackgroundColor: ['#ef5350', '#ffecb3', '#66bb6a']
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ width: '550px', height: '200px', marginLeft:'20px' }}>
             <Doughnut data={data}   /> 
        </div>
    );
};

export default DoughnutChart;