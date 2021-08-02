import React from "react";
import styled from "styled-components";

const BeerTextarea = ({onChange, review})=>{

    return (
        <React.Fragment>
            <Textarea
                onChange={onChange}
                review={review}
                placeholder="맥주에 대한 평가와 소감을 적어주세요.(최대 48자)"
            />
        </React.Fragment>
    )
}
export default BeerTextarea;

const Textarea = styled.textarea`
        width: 208px;
        padding: 10px;
        height: 79;
        resize:none;
        border-radius: 10px;
   
`;
