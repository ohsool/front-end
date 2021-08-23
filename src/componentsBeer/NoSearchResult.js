import React from "react";
import styled from "styled-components";

const NoSearchResult = () => {
    return (
        <Container>
            <Grid>
                <Wrap><p>검색 결과가 없음 페이지</p></Wrap>
            </Grid>
        </Container>
    )

}
export default NoSearchResult;

const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
    bottom: 80px;
`
const Wrap = styled.div`
    margin-left:24px;

`