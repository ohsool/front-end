import React,{  useState } from "react";
import styled from "styled-components";

import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";


const StarButton = ({setStarScore, init_star}) =>{
    const [score, setScore] = useState(init_star);
    const totalStarCount = 5;   
    const starCount = score;
    const removeCount = totalStarCount - starCount;

  const handleScore = (score) => {
    setStarScore(score);
  };
  return (
    <Container>
      <div>
        {[...Array(starCount)].map((n, index) => {
          return (
            <StarIcon 
              key={index}
              style={{ color: "#FFB521", width: "35px", height: "35px"}}
              onClick={() => {
                setScore(index + 1);
                handleScore(index + 1);
              }}
            ></StarIcon>
          );
        })}
        {[...Array(removeCount)].map((n, index) => {
          return (
            <StarBorderIcon
              style={{ color: "#FFB521", width: "35px", height: "35px"}}
              onClick={() => {
                setScore(score + index + 1);
                handleScore(score + index + 1);
              }}
            ></StarBorderIcon>
          );
        })}
      </div>
    </Container>
  )
}
export default React.memo(StarButton);


const Container = styled.div`
  margin-top: 20px;
`;