import React,{useState} from "react";
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";

const SelectBar = ({index, setFeaturesList, featuresList, init_list}) => {
    const arr = [0,0,0,0,0];
    const [cur_position, setCur_Position] = useState();

    const [score, setScore] = useState(0);
    featuresList[index] = score;
    setFeaturesList(featuresList)
    //setFeaturesList(init_list) //수정 작업일 경우 !!!기존 값 저장 되도록...!!
/*
    const handleScore = (score) => {
        featuresList[index] = score;
        setFeaturesList(featuresList)
    };
*/
    return (
      <div style={{width: "200px", marginTop: "35px"}} >
      <ProgressBar percent={25} filledBackground="#FFC44F">
        {arr.length > 0 ? arr.map((p,index) => (
          <Step key={index}>
          {({ accomplished, position, index ,percent}) => ( //accomplished는 도달 여부 T/F, position은 현재 %(예를 들어 2번째를 클릭하면 20%)
            <div 
              style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
              onClick={() => {
                setCur_Position(position);
                setScore(5-((100-position)/25)); //점수
                //handleScore(score);
              }}
               // className={`indexedStep ${accomplished ? "accomplished" : ""}`}

            />
          )}
          
        </Step>        
        )):""}
      
      </ProgressBar>

      </div>
    );

};

export default SelectBar;
//https://pierreericgarcia.github.io/react-step-progress-bar/docs/custom-step-guide
