import React from 'react';
import { Line } from 'react-chartjs-2'
const Graf = (props) => {
    return (
        <div
            style={{
                width: '1000px',
                height: '1000px',
                margin: '50px auto'
            }}
        >
            <Line data={{
                labels: props.label.map(l => l.substr(0, 10)),
                datasets: [
                    {
                        label: 'Corona virus w danym państwie',
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgb(75, 192,192,0.4)',
                        borderColor: 'rgba(75, 192, 192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 0.0,
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: props.yAxis
                    }
                ]
            }} />
        </div>
    )
}

export default Graf