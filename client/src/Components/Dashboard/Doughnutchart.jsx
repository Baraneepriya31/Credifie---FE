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
                data: [], 
                backgroundColor: ['#f44336', '#ffeb3b','#4caf50'], 
                hoverBackgroundColor: ['#ef5350', '#ffecb3' ,'#66bb6a'], 
            }
        ]
    });
      
    useEffect(() => {
        fetch('/api/application-status')
            .then(response => response.json())
            .then(data => {
                const totalApplications = data.verifiedCount + data.inProgressCount + data.rejectedCount;

                // Calculate percentages
                const verifiedPercentage = ((data.verifiedCount / totalApplications) * 100).toFixed(2);
                const inProgressPercentage = ((data.inProgressCount / totalApplications) * 100).toFixed(2);
                const rejectedPercentage = ((data.rejectedCount / totalApplications) * 100).toFixed(2);

                setChartData({
                    datasets: [
                        {
                            label: 'Application Status',
                            data: [verifiedPercentage, inProgressPercentage, rejectedPercentage],
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