import React from "react";
import styled from "styled-components";
import WritedReview from "./WritedReview";

const MyReview = (props) => {
    
    return(
        <React.Fragment>
            <Container>
                <WritedReview/>
                <WritedReview/>
                <WritedReview/>
           </Container>
        </React.Fragment>
    )
}

export default MyReview;

const Container = styled.div`
    margin-top: 60px;
`