//slide효과를 위한 컴포넌트
import React from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {history} from "../redux/configureStore";

//export default function SimpleSlider({

const BeerType = ({dots,
    items,
    show,
    scroll,
    autoplay,
    autoplaySpeed,
    arrows,
}) => {
    const settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 5,//show,
        slidesToScroll: 4,//scroll,
        autoplay,
        autoplaySpeed,
        arrows: false,
    };

    return (
        <Container>
            <StyledSlider {...settings}>
                {/* beer/list/${item} 이런 식으로 URL이 들어간다. */}
                {items.map((item, idx) => (
                    <div onClick={()=> history.push(`beer/list/${item}`) } key={idx}>
                        {item}
                    </div>
                ))}
            </StyledSlider>
        </Container>
    );
}

export default BeerType;

const Container = styled.div`
    width: 360px;
    overflow: hidden;
`;

const StyledSlider = styled(Slider)`
    slick-slide div {
        outline: none;
        dislpay:flex;
    }
    .slick-dots {
        bottom: 5px;
        li {
            width: 10px;
            &.slick-active{
                button:before{
                    color:black;}
                }
            button { 
                &:before {
                    color: white;
                    font-size: 15px;
                }
            }
        }
    }
    .slick-prev,
    .slick-next {
        :before {
            font-size: 20px;
        }
    }
    .slick-prev {
        left: 5px;
        z-index: 10;
    }
    .slick-next {
        right: 5px;
    }
`;

