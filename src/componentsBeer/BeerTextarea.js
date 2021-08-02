import React from "react";
import styled from "styled-components";

const BeerTextarea = ({onChange, review, placeholder})=>{

    return (
        <React.Fragment>
            <Textarea
                onChange={onChange}
                review={review}
                placeholder={placeholder}
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
