import React,{useState, useEffect} from "react";
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";

const SelectBar = ({index, setFeaturesList, featuresList, taste, is_edit}) => {
    const [cur_position, setCur_Position] = useState(0);
    const [score, setScore] = useState(0);

    featuresList[index] = score;
    setFeaturesList(featuresList)  
    
    useEffect(()=>{
      setCur_Position(taste*25-25)
      setScore(taste)
    },[taste])

    return (
      <React.Fragment>
      { is_edit ? (
        <>
            <div style={{width: "200px", marginTop: "35px"}} >
            <ProgressBar percent={cur_position} filledBackground="#FFC44F">
              {featuresList.map((p,index) => (
                <Step key={index}>
                {({ accomplished, position, index ,percent, children}) => ( 
                  <div 
                    style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
                    onClick={() => {
                      setCur_Position(position);
                      setScore(5-((100-position)/25)); 
                    }}
                  />
                )}
              </Step>
              ))}   
            </ProgressBar>
            </div>
            
        </>
  
        ):(
        <>
          <div style={{width: "200px", marginTop: "35px"}} >
          <ProgressBar percent={cur_position} filledBackground="#FFC44F">
            {featuresList.map((p,index) => (
              <Step key={index}>
              {({ accomplished, position, index ,percent, children}) => ( 
                <div 
                  style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
                  onClick={() => {
                    setCur_Position(position);
                    setScore(5-((100-position)/25)); 
                  }}
              
                />
              )}
            </Step>
            ))}   
          </ProgressBar>
          </div>
        </>
        )}
      </React.Fragment>


    );

};

export default SelectBar;
//https://pierreericgarcia.github.io/react-step-progress-bar/docs/custom-step-guide
