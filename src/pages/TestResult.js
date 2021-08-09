import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { testShare } from "../redux/async/beer";
import { recommendCate, recommendBeerToday } from "../redux/reducer/beerSlice";


import BackgroundCateImage from "../componentsTest/BackgroundCateImage";
import { RecommendBeer, ResultInfo, TestHeader } from "../componentsTest/TestIndex";

const TestResult = (props) => {
    const dispatch = useDispatch();
    const categoryParams = props.match.params.category;

    //테스트 후 나온 결과(카테고리)
    const category = useSelector(recommendCate);
    //테스트 후 나온 결과(맥주추천)
    const beerRecommends = useSelector(recommendBeerToday);

    useEffect(() => {
        if(categoryParams === "Lager" 
        || categoryParams === "Pilsner" 
        || categoryParams === "Pale Ale" 
        || categoryParams === "IPA" 
        || categoryParams === "Weizen"
        || categoryParams === "Dunkel" 
        || categoryParams === "Stout" 
        || categoryParams === "Bock"){
        dispatch(testShare({
            result: categoryParams
        }));
    }
    }, []);

    return (
        <React.Fragment>
           
            <TestHeader/>
                <Grid>  
                    <BackgroundCateImage category={category}/>
                    <Wrap>
                        <ResultInfo category={category}/>
                        <RecommendBeerWrap>{/* 해당 카테고리 맥주 2종 추천 */}
                            {beerRecommends?.map((item, idx) => (
                                <RecommendBeer key={idx} item={item}></RecommendBeer>
                            ))}
                        </RecommendBeerWrap>
                    </Wrap>
                    <ReButton
                        onClick={() => {
                            history.push("/test/");
                        }}
                    >다시 하기
                        {/* <img src="https://image.flaticon.com/icons/png/512/724/724863.png"></img> */}
                    </ReButton>
                </Grid>
        </React.Fragment>
    )
}

export default TestResult;

const Grid = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const RecommendBeerWrap = styled.div`
    margin: 14px 0 0 24px;
    width: 312px;
    display: flex;
    justify-content: space-between;
`;

const Wrap = styled.div`
    width: 360px;
    margin: 0 auto;
`;

const ReButton = styled.div`
    text-align: center;
    color: #FFC44F;
    font-size: 14px;
    font-weight: bold;
    line-height: 45px;
    width: 308px;
    height: 45px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: transparent;
    border: 1px solid #FFC44F;
    border-radius: 22.5px;
    & > img{
        margin-left: 4px;
        width: 11px;
        height: 11px;
    }
`;
