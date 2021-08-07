import React from "react";
import styled from "styled-components";

import heart_filled from "../share/image/heart_filled.png";
import heart_empty from "../share/image/heart_black.png";
import detail_heart from "../share/image/heart_detail.png";

const HeartButton = ({_onClick, heart_detail, is_like }) => {
  const icon_url = is_like? heart_filled : heart_empty;
  const icon_url_detal = is_like? detail_heart : heart_empty;

  return (
    <React.Fragment>
      {heart_detail !== "detail" ? (
      <Heart onClick={_onClick} src={icon_url}></Heart> //beerList 하트이미지
      ) :
      (
      <HeartDetail onClick={_onClick} src={icon_url_detal}></HeartDetail> //beerDetail 하트이미지
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

export default React.memo(HeartButton);
