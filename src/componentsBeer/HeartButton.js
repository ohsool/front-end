import React from "react";
import styled from "styled-components";

import heart_pink from "../share/heart_pink.png";
import heart_gray from "../share/heart_gray.png";

const HeartButton = (props) => {

  const icon_url = props.is_like? heart_pink : heart_gray;

  return (
    <React.Fragment>
      <Heart onClick={props._onClick} icon_url={icon_url}></Heart>
    </React.Fragment>
  );
};

const Heart = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  margin: auto;
  background: url(${(props) => props.icon_url});
  background-size: cover;
  cursor: pointer;
`;

export default HeartButton;
