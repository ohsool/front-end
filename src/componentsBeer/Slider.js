//slide효과를 위한 컴포넌트
import React from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BeerType = ({ items, beerCategoryId }) => {
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
                {true && items?.map((item, idx) => (
                    <div /*className={beerId === item ? "clicked" : "non-clicked" */
                        onClick={()=> {
                            const beerCategoryId = item._id;
                            history.push(`/beer/list/${beerCategoryId}`);
                        }
                    } key={idx}>
                        {item.name}
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

