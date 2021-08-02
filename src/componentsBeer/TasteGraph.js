import React from 'react';
import { Radar } from 'react-chartjs-2';

const data = {
  labels: ['고소한맛', '쓴맛', '단맛', '청량감', '향'],
  datasets: [
    {
        label: "맥주 맛 평점",
        data: [2, 5, 3, 4, 4],
        backgroundColor: 'rgba(255, 196, 79, 0.5)',  //rgba(255, 255, 255, 0.2)
        borderColor: '#FFC44F',
        borderWidth: 3,
    },
  ],
};
const options = {
    scales: {
        angles: {
            display: false,
        },
        r: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 1,
            }
        }
    },
};

const TasteGraph = (props) => (
  <>
    <Radar data={data} options={options} />
  </>
);

export default TasteGraph;