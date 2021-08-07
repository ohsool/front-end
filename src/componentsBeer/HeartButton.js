import React from "react";
import styled from "styled-components";

import heart_red from "../share/image/heart_red.jpeg";
import heart_black from "../share/image/heart_black.png";

const HeartButton = ({_onClick, heart_detail, is_like }) => {
  const icon_url = is_like? heart_red : heart_black;

  return (
    <React.Fragment>
      {heart_detail !== "detail" ? (
      <Heart onClick={_onClick} src={icon_url}></Heart>
      ) :
      (
      <HeartDetail onClick={_onClick} src={icon_url}></HeartDetail>
      )}
    </React.Fragment>
  );
};

const Heart = styled.img`
  width: 16px;
  height: 16px;
  float: right;
`;
const HeartDetail = styled.img`
  width: 38px;
  height: 38px;
  box-sizing: border-box;
`;

export default HeartButton;
