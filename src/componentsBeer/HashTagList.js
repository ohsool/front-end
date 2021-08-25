import React from "react";
import styled from "styled-components";
import EachBeer from "./EachBeer";

const HashTagList = ({ hashtag, hashtagName, setHashtagName }) => {

    return(
        <React.Fragment>
            <span style={{
                float:"right", 
                marginRight: "30px",
                fontSize:"12.5px", 
                fontWeight:"500",
                paddingBottom: "10px"
                }}>
                    <strong>#{hashtagName}</strong>로 검색된 맥주는
                총 <strong>
                     {hashtag?.length}
                </strong>건입니다.
            </span>
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