import React from "react";
import styled from "styled-components";
import EachBeer from "./EachBeer";

const HashTagList = ({ hashtag, hashtagName, setHashtagName }) => {

    return(
        <React.Fragment>
            <span style={{
                float:"right", 
                marginRight: "30px",
                fontSize:"14px", 
                fontWeight:"500"}}>
                    {hashtagName}
                총 
                <span style={{color:"#FFC44F",fontWeight:"700"}}>
                    {hashtag?.length}
                </span>건입니다.
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