//slide효과를 위한 컴포넌트
import React, { useState } from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";

import Slider from "react-slick";
import "../share/style/myBeer.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BeerType = (props) => {
    const { 
        items, 
        setOpen_Modal, 
        setIs_Search,
        setHashtag,
        get_category_id    
    } = props;
    const [is_Clicked, setIs_Clicked] = useState(true);

    const settings = {
        infinite: false,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        initialSlide: 0,
    };

    const clickSlider = () => {
        setIs_Search(false);
        setOpen_Modal(false); //카테고리 클릭시 검색 모달 닫기
        setHashtag(false);
    }

    return (
        <Container>
            <StyledSlider 
            {...settings}>
                {true && items?.map((item, idx) => (
                    <div 
                        className="clickSlider"
                        className={get_category_id === item._id ? 
                            "clickSlider"
                            : "nonClickSlider"
                        }
                        onClick={() => {
                            clickSlider();
                            history.push(`/beer/list/${item._id}`)
                        }} 
                        key={idx}>
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
`;
