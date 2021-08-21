import React from "react";
import styled from "styled-components";
import EachBeer from "./EachBeer";

const HashTagList = ({ hashtag, hashtagName }) => {

    return(
        <React.Fragment>
            <Text>
                <span>#{hashtagName}</span>으로 검색된 맥주는 
                <span>{hashtag?.length}</span>건입니다.
            </Text>
            <List>                    
                {hashtag?.length > 0 ? hashtag?.map((item, idx) => (
                    <EachBeer key={idx} item={item} />
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
const Text = styled.span`
    margin: 5px 0 5px 30px;
    fontSize:14px; 
    fontWeight:500;
    & > span{
        color:#FFC44F;
        fontWeight:700

    }
`