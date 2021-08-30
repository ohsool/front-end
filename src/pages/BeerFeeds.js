import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { getAllBeerDogam } from "../redux/async/mybeer";
import { userInfo } from "../redux/async/user";
import EachReview from "../componentsBeerDetail/EachReview";
import InfinityScrollLoader from "../componentsBeer/InfinityScrollLoader";
import BeerFeedsInfo from "../componentsMypage/BeerFeedsInfo";

const BeerFeeds = (props) => {
    const allFeeds = useSelector((state) => state.mybeer.allDogam);
    const last = useSelector((state) => state.mybeer.dogamLast);
    const is_iphone = navigator.userAgent.toLowerCase(); //아이폰인지 아닌지(노치디자인때문에)
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInfo());
    }, []);

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
        if(last){
            return;
        }
        if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
            setPaging(paging + 1);
            getAllFeeds();
            setLoading(true);
        }
    }, 500);

    useEffect(() => {
        if(paging === 0 && allFeeds.length === 0){
            dispatch(getAllBeerDogam(0));
            setPaging(paging+1);
            return
        }
    }, [paging]);

    useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging, loading]);

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return(
        <React.Fragment>
            <Header/>
            <FeedsContainer style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "100px"} : {marginTop: "60px"}}>
                {allFeeds?.map((item, idx) => {
                    return(
                        <>
                        <BeerFeedsInfo item={item}/>
                        <EachReview item={item} key={idx} />
                        <BottomLine></BottomLine>
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

const BottomLine = styled.div`
    border-bottom: 0.5px solid #C4C4C4;
    max-width: 400px;
    margin: 16px auto;
`;