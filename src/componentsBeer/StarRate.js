import React,{  useState } from "react";
import styled from "styled-components";

//import StarIcon from "@material-ui/icons/Star";
//import StarBorderIcon from "@material-ui/icons/StarBorder";
import star_filled from "../share/image/star_filled.png";
import star_empty from "../share/image/star_empty.png";



const StarButton = ({setStarScore, init_star}) =>{
    const [score, setScore] = useState(init_star); //별점
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
            <StarFilled
              key={index}
              src={star_filled}
              onClick={() => {
                setScore(index + 1);
                handleScore(index + 1);
              }}
            ></StarFilled>
          );
        })}
        {[...Array(removeCount)].map((n, index) => {
          return (
            <StarEmpty
              key={index}
              src={star_empty}
              onClick={() => {
                setScore(score + index + 1);
                handleScore(score + index + 1);
              }}
            ></StarEmpty>
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

const StarFilled = styled.img`
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  cursor: pointer;
`

const StarEmpty = styled.div`
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  cursor: pointer;

`