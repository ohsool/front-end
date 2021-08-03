import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

const TasteGraph = ({ beers }) => {
  const [labels, setLabels] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if(beers){
      setLabels(Object.keys(beers));
      setScores(Object.values(beers));
    }
  }, []);   // 렌더링 횟수 줄이기

  const data = {
    labels: labels,
    datasets: [
      {
        label: "맥주맛평점",
        data: scores,
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
  return(
    <>
      <Radar data={data} options={options} />
    </>
  )
};

export default TasteGraph;