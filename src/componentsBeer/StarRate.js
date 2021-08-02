import React,{  useState } from "react";
import styled from "styled-components";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const StarButton = (props) =>{

      //별점
      const [score, setScore] = useState(0);
      const starCount = score; //평점
      const [star_review, setStar_Review] = useState({
          rate: 5,
        });
      const totalStarCount = 5;
      
      const removeCount = totalStarCount - starCount;
  
    const handleScore = (score) => {
      setStar_Review({
        ...star_review,
        rate: score,
      });
      console.log("score",score,"star_review",star_review)
    };

  

  return (
    <Container>
      <div>
        {[...Array(starCount)].map((n, index) => {
          return (
            <StarIcon 
              key={index}
              style={{ color: "#FFB521", width: "25px", height: "25px"}}
              onClick={()=>{
                setScore(index + 1);
                handleScore(index + 1);
              }}></StarIcon>
          );
        })}
        {[...Array(removeCount)].map((n, index) => {
          return (
            <StarBorderIcon
              key={index}
              style={{ color: "#FFB521", width: "25px", height: "25px"}}
              onClick={()=>{
                setScore(score+index + 1);
                handleScore(score + index + 1);}
              }></StarBorderIcon>
          );
        })}
      </div>
    </Container>
  )
}
export default StarButton;


const Container = styled.div`
  margin-bottom: 30px;
`;