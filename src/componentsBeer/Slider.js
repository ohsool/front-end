//slide효과를 위한 컴포넌트
import React from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BeerType = ({ items, setOpen_Modal, setIs_Search,setHashtag }) => {
    const settings = {
        infinite: false,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 3,
        variableWidth: true,
    };

    return (
        <Container>
            <StyledSlider 
            {...settings}>
                {true && items?.map((item, idx) => (
                    <div  
                        onClick={() => {
                            setIs_Search(false);
                            setOpen_Modal(false); //카테고리 클릭시 검색 모달 닫기
                            setHashtag(false);
                            history.push(`/beer/list/${item._id}`)
                            // item.name === "All" ? history.push("/beer/list")
                            // :
                            // history.push(`/beer/list/${item._id}`)
                        }} key={idx}>
                        {item.name}
                    </div>
                ))}
            </StyledSlider>
        </Container>
    );
}

export default React.memo(BeerType);

const Container = styled.div`
    margin: 0 6px;
    width: 336px;
    overflow: hidden;
`;

const StyledSlider = styled(Slider)`
    color: #C4C4C4;
    font-size: 14px;
    .slick-slide div {
        // position: relative;
        outline: none;
        //width: 60px;
        padding: 0 6px;
        text-align: center;
        cursor: pointer;
        :focus{
            font-weight: 700;
            color: black;
            text-decoration: underline;
        }
    }
`;
