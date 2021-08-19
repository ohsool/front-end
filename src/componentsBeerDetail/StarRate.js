import React,{  useState } from "react";
import styled from "styled-components";
import star_filled from "../share/image/star_filled.png";
import star_empty from "../share/image/star_empty.png";
const StarButton = ({setStarScore, init_star, is_my}) =>{
    const [score, setScore] = useState(init_star); //별점
    const totalStarCount = 5;   
    const starCount = score; 
    const removeCount = totalStarCount - starCount;
  const handleScore = (score) => {
    setStarScore(score);
  };
  return (
    is_my ?  <Container>
      <div style={{display:"flex"}}>
        {[...Array(starCount)].map((n, index) => {
          return (
            <StarFilled
              key={index}
              style={{backgroundImage: `url(${star_filled})`,cursor:"unset"}}
            ></StarFilled>
          );
        })}
        {[...Array(removeCount)].map((n, index) => {
          return (
            <StarEmpty
              key={index}
              style={{backgroundImage: `url(${star_empty})`,cursor:"unset"}}
              
            ></StarEmpty>
          );
        })}
      </div>
    </Container>
:
    <Container>
      <div style={{display:"flex"}}>
        {[...Array(starCount)].map((n, index) => {
          return (
            <StarFilled
              key={index}
              style={{backgroundImage: `url(${star_filled})`}}
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
              style={{backgroundImage: `url(${star_empty})`}}
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
  margin: 7px auto;
`;
const StarFilled = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
`
const StarEmpty = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
`