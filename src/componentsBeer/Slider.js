//slide효과를 위한 컴포넌트
import React from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {history} from "../redux/configureStore";

const BeerType = ({ items, beerId }) => {
    const settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 5,//show
        slidesToScroll: 3,//scroll
        variableWidth: true, // slider 간격조정
        arrows: false,
    };
    
    return (
        <Container>
            <StyledSlider {...settings}>
                {/* beer/list/${item} 이런 식으로 URL이 들어간다. */}
                {true && items.map((item, idx) => (
                    <div /*className={beerId === item ? "clicked" : "non-clicked" */
                        onClick={()=> history.push(`beer/list`) } key={idx}>
                        {item}
                    </div>
                ))}
            </StyledSlider>
        </Container>
    );
}

export default BeerType;

const Container = styled.div`
    margin-left: 35px;
    width: 360px;
    overflow: hidden;
`;

const StyledSlider = styled(Slider)`
    color: #C4C4C4;
    font-size: 14px;
    .slick-slide div {
        position: relative;
        outline: none;
        width: 60px;
    }
`;

