import React from "react";
import styled from "styled-components";
import EachBeer from "./EachBeer";

const HashTagList = ({ hashtag, hashtagName, setHashtagName }) => {

    return(
        <React.Fragment>
            <HashTagSearchResultWrap>
            <span>
            <span style={{color:"#FFC44F",fontWeight:"700"}}>
                #{hashtagName}</span>
                으로 검색된 맥주는 총 
                <span style={{color:"#FFC44F",fontWeight:"700"}}>
                {hashtag?.length}
            </span>건입니다.
            </span>
            </HashTagSearchResultWrap>
            <List>                    
                {hashtag?.length > 0 ? hashtag?.map((item, idx) => (
                    <EachBeer 
                    setHashtagName={setHashtagName}
                    key={idx} item={item} />
                )):""}
            </List>

        </React.Fragment>
    )
}

export default React.memo(HashTagList);

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const HashTagSearchResultWrap = styled.div`
    margin: 20px auto;
    width: 300px;
    & > span{
        font-size: 14px; 
        font-weight: 500;
    }
`;