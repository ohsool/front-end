import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { getOneBeer, likeBeer, unLikeBeer } from "../redux/async/beer";
import { getReview } from "../redux/async/review";
import { userInfo } from "../redux/async/user";
import { oneBeer } from "../redux/reducer/beerSlice";
import { getReviewList } from "../redux/reducer/reviewSlice";
import { User } from "../redux/reducer/userSlice";

import { MapModal, HeartButton, TasteGraph, EachReview} from "./BeerIndex";

import mapIcon from "../share/image/mapIcon.png";


const BeerDetail = (props) =>{
    const [toggle, setToggle] = useState(false);
    const heart_detail = "detail"
    const beerOne = useSelector(oneBeer);
    const userId = useSelector(User);
    const beer_infos = useSelector(getReviewList);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => { //맥주 정보, 사용자정보 및 리뷰정보 불러오기
        dispatch(getOneBeer(props.match.params.beerId));
        dispatch(getReview(props.match.params.beerId));
        dispatch(userInfo());
    }, [dispatch, props.match.params.beerId]);

    useEffect(() => { //좋아요된 상태면 좋아요눌린걸로 아니면 false그대로
        if(beerOne && userId){
            if(beerOne.like_array.includes(userId)){
                setToggle(true);
            }else{
                setToggle(false);
            }
        }
    }, [beerOne, userId]);

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    const clickLike = () => { //좋아요 및 좋아요 취소 기능
        if(userId){
            if(toggle === true){
                dispatch(unLikeBeer(beerOne._id));
                 setToggle(false)
            }else{
                dispatch(likeBeer(beerOne._id));
                setToggle(true);
            }
        }else{ //로그인 안한 유저가 좋아요 눌렀을때 눌리는 것 방지
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return;
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
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clickLike();
                                }}
                                is_like={toggle}                
                            />
                        </HeartWrap>
                        </Horizion>
                        <p style={{margin: "0px"}}>{beerOne?.name_english}</p>
                        {beerOne?.hashtag?.map((item, idx)=>(
                            <TasteTag>
                                <span>#{item}</span>
                            </TasteTag>
                        ))}    
                    </Wrap>
                    <Line/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>맥주소개</span>
                        <BeerContent>
                            맥주 설명!!!
                        </BeerContent>
                    </Wrap>
                    <Line/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>그래프</span>                      
                    </Wrap>
                    <Graph>
                        <TasteGraph beers={beerOne?.features}/>
                    </Graph>
                    <Line/>
                    <Wrap>
                        <p style={{ fontWeight: "700",paddingBottom: "7px"}}>판매처</p>
                        <div style={{display: "flex"}}>
                        <MapIcon style={{backgroundImage: `url(${mapIcon})`}}/> 
                        <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>GS25 편의점</span>
                        </div>    
                    </Wrap>
                    <LineShort/>                    
                    <Wrap>
                        <p style={{ fontWeight: "700" ,paddingBottom: "14px"}}>제보된 판매처</p>
                        <div style={{display: "flex"}}>
                        <MapIcon style={{backgroundImage: `url(${mapIcon})`}}/> 
                        <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>GS25 편의점</span>
                        </div>

                        <PlaceButton 
                            onClick={() => {
                                openModal();
                            }}
                        >장소 제보하기</PlaceButton>
                        <MapModal 
                        beerId={props.match.params.beerId}
                        open={modalOpen}
                        close={closeModal}
                        ></MapModal>
                    </Wrap>
                    <Line/>

                    <Wrap>
                    <p style={{ fontWeight: "700",paddingBottom: "14px"}}>리뷰</p>
                        <Gradient>
                            {beer_infos?.length > 0 ? beer_infos?.map((item, idx) => (
                                idx < 4 ? (
                                    <>
                                    <EachReview key={idx} item={item} userId={userId}/>
                                    </>) : null
                            )): ""}
                        </Gradient>
                        <div style={{textAlign: "center", cursor: "pointer"}}>
                        <span style={{ paddingBottom: "20px",  fontWeight: "700", fontSize: "14px", lineHeight: "20.27px", fontStyle: "bold"
                            }} onClick={()=>{
                                history.push(`/beer/review/${beerOne._id}`, { beer_infos, userId })
                        }}>전체보기</span>
                        </div>
                    </Wrap>  
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default React.memo(BeerDetail, TasteGraph);

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
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;
`;

const BeerImage = styled.div`
    width: 100%;
    height: 380px;
    text-align: center;
    background-color: #F6F6F6;
    & > img{ 
        width: 315px;
        height: 315px;
        margin: 23px auto;
    }
    @media (img: img) {
        & > img { 
            width: 315px;
            height: 315px;
            margin: 22px auto;
         }
    }
`;
const Wrap = styled.div`
    width: 320px;
    margin: 20px auto;
`;

const Line = styled.hr`
    width: 360px;
    text-align: center;
    border:0.2px solid #c4c4c4;
`
const LineShort = styled.hr`
    width: 312px;
    text-align: center;
    border:0.5px solid #c4c4c4;
`
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
    border: 2px solid #C4C4C4;
    border-radius: 10px;
`;

const MapIcon = styled.div`
    width: 8px;
    height: 12px;
    margin-right: 5px;
`;

const PlaceButton = styled.button`
    width: 308px;
    height: 45px;
    border-radius: 50px;
    border: 1px solid #FFC44F;
    background-color: #fff;
    margin-top: 16px;
    cursor: pointer;
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
    margin: 0 auto;
    z-index: 1;
    -webkit-mask-size: 312px 420px; 
    -webkit-mask-image: -webkit-gradient(linear, center bottom, center top,
    color-stop(1.00, rgba(0,0,0,1)), 
    color-stop(0.00, rgba(0,0,0,0)));
`;