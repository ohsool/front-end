import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { getOneBeer, likeBeer, unLikeBeer } from "../redux/async/beer";
import { getReview } from "../redux/async/review";
import { userInfo } from "../redux/async/user";

import HeartButton from "./HeartButton";
import TasteGraph from "./TasteGraph";
import EachReview from "./EachReview";

const BeerDetail = (props) =>{
    const [toggle, setToggle] = useState(false);
    const heart_detail = "detail"
    const beerOne = useSelector(state => state.beer.beerOne);
    const userId = useSelector(state => state.user.currentUser.userId);
    const beer_infos = useSelector(state => state.review.reviewList);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getData() {
            await dispatch(getOneBeer(props.match.params.beerId));            
            await dispatch(userInfo());
            await dispatch(getReview(props.match.params.beerId));
        }
        return getData();
    }, []);
     
    useEffect(() => {
        async function getLikeData(){
            if(beerOne?.like_array?.includes(userId)){
                setToggle(true);
               }
        }
        return getLikeData();
    });

    const clickLike = () => {
        if(userId){
            if(toggle === true){
                dispatch(unLikeBeer(beerOne._id));
                 setToggle(false)
            }else{
                dispatch(likeBeer(beerOne.beerId));
                setToggle(true);
            }
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return
            }
        }

    }

    return(
        <React.Fragment>
            <Container>
                <Grid>
                    <BeerImage>
                        <img src={beerOne?.image} />
                    </BeerImage>
                    <Wrap>
                        <Horizion>
                        <BeerName>{beerOne?.name_korean}</BeerName>
                        <HeartWrap>
                            <HeartButton
                                heart_detail={heart_detail}
                                _onClick={(e) => {
                                    // e.preventDefault();
                                    // e.stopPropagation();
                                    clickLike();
                                }}
                                is_like={toggle}                
                            />
                        </HeartWrap>
                        </Horizion>
                        <span>{beerOne?.name_english}</span>
                        {beerOne?.hashtag?.map((item, idx)=>(
                            <TasteTag>
                                <span>#{item}</span>
                            </TasteTag>
                        ))}       
                    </Wrap>
                    <hr/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>맥주소개</span>
                        <BeerContent>
                            스위트하게~위트있게~
                            밀맥주 맛에 Tropical Fruit의
                            달콤함이 어우러진 곰표 우리나라 밀맥주
                        </BeerContent>
                    </Wrap>
                    <hr/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>그래프</span>                      
                    </Wrap>
                    <Graph>
                        <TasteGraph beers={beerOne?.features}/>
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

                        <PlaceButton>장소 제보하기</PlaceButton>

                    </Wrap>
                    <hr/>

                    <Wrap>
                    <span style={{ fontWeight: "700",paddingBottom: "14px"}}>리뷰</span>
                        <Gradient>
                            {beer_infos?.length > 0 ? beer_infos?.map((item, idx) => (
                                idx < 4 ? (
                                    <>
                                    <EachReview key={idx}  item={item}/>
                                    </>) : null
                            )): ""}
                            <span style={{ textAlign:"center", paddingBottom: "20px",  fontWeight: "700", fontSize: "14px", lineHeight: "20.27px", fontStyle: "bold"
                            }} onClick={()=>{
                                history.push(`/beer/review/${beerOne._id}`, { beer_infos, userId })
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
    & > span{
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
`;

const BeerImage = styled.div`
    width: 360px;
    height: 380px;
    border-radius: 10px;
    background-color: #F6F6F6;
    & > img{ 
        width: 315px;
        height: 315px;
        margin: 23px 32px;
    }
    @media (img: img) {
        & > img { 
            width: 315px;
            height: 315px;
            margin: 22px 32px;
         }
    }
`;
const Wrap = styled.div`
    width: 320px;
    margin: 20px 24px;
`;

const HeartWrap = styled.div`
    width: 38px;
    height: 38px;
    display: flex;
`;

const Horizion = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const BeerName= styled.p`
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    width: 250px;
    overflow: hidden;
    white-space: nomal;
`;

const BeerContent = styled.div`
    padding: 14px 0;
    margin: 0;
    width: 250px;
`;

const Graph = styled.div`
    margin: 14px auto;
    display: flex;
    width: 313px;
    height: 313px;
    border: 2px solid #FFC44F;
    border-radius: 10px;
`;

const PlaceButton = styled.button`
    width: 308px;
    height: 45px;
    border-radius: 50;
    border: 1px solid #FFC44F;
    background-color: #fff;
    margin-top: 16px;
`;

const TasteTag = styled.div`
    display: inline-block;
    margin-right: 3px;
    padding: 0 6px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #333333;
`;

const Gradient = styled.div`
    position: absolute;
    margin: 0 auto;
<<<<<<< HEAD
    z-index: 1;
    -webkit-mask-image: -webkit-gradient(linear, center bottom, center top,
    color-stop(1.00,  rgba(0,0,0,1)),
    color-stop(0.00,  rgba(0,0,0,0)));
=======
    -webkit-mask-size: 312px 420px; 
    -webkit-mask-image: -webkit-gradient(linear, center bottom, center top,
    color-stop(1.00, rgba(0,0,0,1)), 
    color-stop(0.00, rgba(0,0,0,0)));
>>>>>>> da873ce1d3ac6ce298ba1362a5379792e94e6da5
`;