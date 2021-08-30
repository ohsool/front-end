import React from 'react';
  
const ProgressBar = ({progress}) => {
     
    const Parentdiv = {
        margin: "0 auto",
        textAlign: "center",
        height: 15,
        width: '312px',
        backgroundColor: "#F7F7F7",
        borderRadius: 40,
        marginTop: "30px"
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#FFC44F",
        borderRadius:40,
        textAlign: 'right',
      }
      
      const progresstext = {
        paddingTop: "2.5px",
        color: 'black',
        fontWeight: 800,
        fontSize:"9px"
      }
        
    return (
      <div style={Parentdiv}> 
        <div style={Childdiv}> 
            <div style={progresstext}>{`${progress}%`}</div> 
        </div> 
      </div>
    )
}
  
export default ProgressBar;