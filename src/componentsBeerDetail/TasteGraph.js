import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

const TasteGraph = ({ beers }) => {
  const [labels, setLabels] = useState();
  const [scores, setScores] = useState();

  useEffect(() => { //평점정보 불러오기
      if(beers) {
        //맛 종류 5가지 불러오기
        //setLabels(Object.keys(beers) ?? ["쓴맛", "청량감", "flavor", "sweet", "nutty"]);
        setLabels(["쓴맛", "청량감", "향", "단맛", "고소한맛"]);
        //맛마다 평점 정보 받아오기
        setScores(Object.values(beers) ?? [0, 0, 0, 0, 0]);
      }
  }, [beers]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "맥주맛평점",
        data: scores,
        backgroundColor: 'rgba(255, 196, 79, 0.5)', 
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
            max: 5, //그래프의 최대값
            min: 0, //그래프의 최소 값(중앙)
            ticks: {
                stepSize: 1, //그래프간격마다 점수
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

export default React.memo(TasteGraph);