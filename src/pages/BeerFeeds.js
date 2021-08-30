import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { getAllBeerDogam } from "../redux/async/mybeer";
import EachReview from "../componentsBeerDetail/EachReview";
import InfinityScrollLoader from "../componentsBeer/InfinityScrollLoader";

const BeerFeeds = (props) => {
    const allFeedsData = useSelector((state) => state.mybeer.allDogam);
    const is_iphone = navigator.userAgent.toLowerCase(); //아이폰인지 아닌지(노치디자인때문에)
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const [allFeeds, setAllFeeds] = useState([])
    const dispatch = useDispatch();
    
    useEffect(() => {
        setAllFeeds([...allFeeds, ...allFeedsData]);
        if(allFeedsData.length < 8){
            return setPaging(9999);
        }
    }, [allFeedsData]);

    const getAllFeeds = useCallback (() => {
        async function getData(){
        await dispatch(getAllBeerDogam(paging));
            setLoading(false);
        }
        return getData();
    }, [paging, allFeeds]);
    
    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
            if(paging >= 9998){
                return;
            }
            setPaging(paging + 1);
            getAllFeeds();
            setLoading(true);
        }
    }, 500);
    
    useEffect(() => {
        if(paging === 0 && allFeeds.length === 0){
            dispatch(getAllBeerDogam(paging));
            setPaging(paging+1);
        }
        if(allFeeds.length !== 0 ){
            setPaging(allFeeds.length/8 + 1)
        }
    }, []);

    useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging, loading]);

    return(
        <React.Fragment>
            <Header/>
            <FeedsContainer style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "100px"} : {marginTop: "60px"}}>
                {allFeeds?.map((item, idx) => {
                    return(
                        <>
                        <EachReview item={item} key={idx} />
                        <FeedsBeerInfo>
                            <img src={item.beerId?.image}></img>
                        </FeedsBeerInfo>
                        </>
                    )
                })}
            {loading ? 
            <div style={{marginTop: "20px"}}>
                <InfinityScrollLoader/>
            </div>
            : ""}
            </FeedsContainer>
            <NavigationBar props={props}/>
        </React.Fragment>
    )
}

export default BeerFeeds;

const FeedsContainer = styled.div`
    margin-top: 60px;
    margin-bottom: 120px;
`;

const FeedsBeerInfo = styled.div`
    display: flex;
    justify-content: center;
    & > img{
        width: 80px;
        height: 80px;
    }
`;