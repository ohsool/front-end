import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";
import { useDispatch } from "react-redux";

import HeartButton from "./HeartButton";
import TasteGraph from "./TasteGraph";
import EachReview from "./EachReview";
import { useSelector } from "react-redux";
import { getReview } from "../redux/async/review";

const BeerDetail = (props) =>{
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const heart_detail = "detail"
    const beers = useSelector(state => state.beer.beerList.beers);
    const index = beers.findIndex((p) => p._id === props.match.params.beerId);

    //const reviews = useSelector(state => state.review.reviewList.reviews);
    //const onebeer_index = reviews.findIndex((p) => p._id === props.match.params.beerId)

    //console.log("review:", onebeer_index)


    useEffect(() => {
        dispatch(getReview());
    }, []);
    

    const beer = beers[index];
    
    const reviews = [
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
    ];   
    
    return(
        <React.Fragment>
            <Container>
                <Grid>
                    <Img>
                        <img src="" />
                    </Img>

                    <Wrap>
                        <Horizion>
                        <span style={{ fontWeight: "700", fontSize: "20px", lineHeight: "29px"}}>{beers[index]?.name_korean}</span>
                        <div style={{ width: "38px", height: "38px", display: "flex", position: "absolute", right: "24px"}}>
                            <HeartButton
                                heart_detail={heart_detail}
                                _onClick={(e) => {
                                    toggle ? setToggle(false) : setToggle(true);
                                    e.preventDefault();
                                    e.stopPropagation();              
                                }}
                                is_like={toggle}                 
                            />
                        </div>
                        </Horizion>
                        <span>{beers[index]?.name_english}</span>
                        {beers[index]?.hashtag.map((item, idx)=>(
                            <TasteTag>
                                <span>#{item}</span>
                            </TasteTag>
                        ))}

                        
                    </Wrap>
                    <hr/>

                    <Wrap>
                        <span style={{ fontWeight: "700"}}>맥주소개</span>
                        <span style={{ fontWeight: "500", fontSize: "14px", lineHeight: "20px",padding: "14px 0", minHeight: "60px"
                            }}>스위트하게~위트있게~
                            밀맥주 맛에 Tropical Fruit의
                            달콤함이 어우러진 곰표 우리나라 밀맥주
                        </span>

                    </Wrap>

                    <hr/>

                    <Wrap>
                        <span style={{ fontWeight: "700"}}>그래프</span>
                        
                    </Wrap>
                    <Graph>
                        <TasteGraph/>
                    </Graph>

                    <hr/>

                    <Wrap>
                        <span style={{ fontWeight: "700",paddingBottom: "14px"}}>판매처</span>
                        <div style={{display: "flex"}}>
                        <button/> 
                        <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>GS25 편의점</span>
                        </div>    
                        


                    </Wrap>
                    <hr/>
                    
                    <Wrap>
                        <span style={{ fontWeight: "700" ,paddingBottom: "14px"}}>제보된 판매처</span>
                        <div style={{display: "flex"}}>
                        <button/> 
                        <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>GS25 편의점</span>
                        </div>
                        
                        <ReportButton>장소 제보하기</ReportButton>

                    </Wrap>
                    <hr/>

                    <Wrap>
                    <span style={{ fontWeight: "700",paddingBottom: "14px"}}>리뷰</span>
                        <Gradient>
                            {reviews.length > 0 ? reviews.map((item, idx) => (
                                idx < 4 ? (<React.Fragment>
                                    <EachReview key={idx} idx={idx} {...item}/>
                                    
                                    </React.Fragment>) : null
                            )): ""}
                            <span style={{ textAlign:"center", paddingBottom: "20px",  fontWeight: "700", fontSize: "14px", lineHeight: "20.27px", fontStyle: "bold"
                            }} onClick={()=>{
                                history.push("/beer/review", {beer})
                            }}>전체보기</span>
                        </Gradient>

                            

                    </Wrap>
                </Grid>
            </Container>



        </React.Fragment>

    )

}

export default BeerDetail;


const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
    span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: auto;
        text-align:left;
    }

`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
    margin-top: 40px;
`


const Img = styled.div`
    width: 360px;
    height: 380px;
    border-radius: 10px;
    background-color: #F6F6F6;
    & > img{ 
        width: 360px;
        height: 380px;
    }

`

const Wrap = styled.div`
    width: 274px;
    margin: 20px 24px;
`
const Horizion = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const Graph = styled.div`
    margin: 14px auto;
    display: flex;
    width: 313px;
    height: 313px;
    border: 2px solid #FFC44F; 
    border-radius: 10px;
`

const ReportButton = styled.button`
    width: 308px;
    height: 45px;
    border-radius: 50px;
    border: 1px solid #FFC44F;
    background-color: #fff;
    margin-top: 16px;

`

const TasteTag = styled.div`
    display: inline-block;
    margin: 5px 0px;
    margin-right: 3px;
    padding: 0 6px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    line-height: 16px;
    color: #555;

`;

const Gradient = styled.div`
    position: absolute;
    z-index: 100;
    -webkit-mask-size: 312px 420px;
    -webkit-mask-image: -webkit-gradient(linear, center bottom, center top;
    color-stop(1.00,  rgba(0,0,0,1));
    color-stop(0.00,  rgba(0,0,0,0)));
`;