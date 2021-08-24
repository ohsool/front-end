import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { getOneBeer, likeBeerDetail, unLikeBeerDetail } from "../redux/async/beer";
import { getReview } from "../redux/async/review";
import { userInfo } from "../redux/async/user";
import { oneBeer } from "../redux/reducer/beerSlice";
import { getReviewList } from "../redux/reducer/reviewSlice";
import { User } from "../redux/reducer/userSlice";
import {HeartButton}  from "../componentsBeer/BeerIndex";
import { TasteGraph, EachReview} from "./BeerDetailIndex";
import mapIcon from "../share/image/mapIcon.png";
import writeIcon from "../share/image/review_write.png";
import star from "../share/image/star.png";
import like from "../share/image/heart.png";
import {ReviewWriteModal} from "../componentsBeerDetail/BeerDetailIndex";
import _ from "lodash";
//렌더링 8번 됨
const BeerDetail = (props) =>{
    const [toggle, setToggle] = useState(false);
    const heart_detail = "detail"
    const beerOne = useSelector(oneBeer);
    const hashtag = beerOne?.hashtag;
    const userId = useSelector(User);
    const beer_infos = useSelector(getReviewList);
    const is_iphone = navigator.userAgent.toLowerCase();
    const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const is_comment = beer_infos.find((p) => p.userId._id === userId);
    const dispatch = useDispatch();

    useEffect(() => { //맥주 정보, 사용자정보 및 리뷰정보 불러오기
        dispatch(getOneBeer(props.match.params.beerId));
        dispatch(getReview(props.match.params.beerId));
        dispatch(userInfo());
    }, [dispatch, props.match.params.beerId]);

    useEffect(() => { //좋아요된 상태면 좋아요 눌린걸로 아니면 false그대로
        if(beerOne && userId){
            if(beerOne.like_array.includes(userId)){
                setToggle(true);
            }else{
                setToggle(false);
            }
        }
    }, [beerOne, userId]);

    const is_Login = () => {
        if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
            history.push("/login");
            return;
        }
    }

    const clickLike = () => { //좋아요 및 좋아요 취소 기능
        if(userId){
            if(toggle === true){
                dispatch(unLikeBeerDetail(beerOne._id));
                 setToggle(false)
            }else{
                dispatch(likeBeerDetail(beerOne._id));
                setToggle(true);
            }
        }else{ //로그인 안한 유저가 좋아요 눌렀을때 눌리는 것 방지
            is_Login();
        }
    }

    const clickPlaceReport = () => {
        if(userId){
            history.push("/place", beerOne._id)
        }else{
            is_Login();
        }
    }
    
    const loginConfirm = ()=>{
        if(userId){
            if(is_comment){
                alert("이미 리뷰를 작성하셨습니다!")
            }else{
                setModalOpen(true);
                
            }
        }else{
            is_Login();
        }
    }

    const _scrollPosition = _.debounce(() => {
        const scrollHeight = document.documentElement.scrollTop;
        SetScrollHeightInfo(scrollHeight);
    }, 200)
  
    useEffect(() => {
        window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제
        };
    }, [beerOne,scrollHeightInfo]);

    const closeModal = () => {
        setModalOpen(false);
    };

    const reportedPlace = () => {
        if(beerOne?.location_report[0]){
            return(
            <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>
                {beerOne?.location_report[0][1]}
            </span>
            );
        }else{
            return (
            <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>
                제보된 장소 없음
            </span>
            );
        }
    }
 

    return(
        <React.Fragment>
            <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>
                <Grid>
                    <BeerImage>
                        <img src={beerOne?.image} />
                    </BeerImage>
                    <Wrap>
                        <JustifyAlign>
                            <div>
                            <BeerName>{beerOne?.name_korean}</BeerName>
                            <BeerNameEng>{beerOne?.name_english}</BeerNameEng>
                            </div>

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
                        </JustifyAlign>

                        <div style={{display: "flex"}}>
                            <div style={{width: "219px",flexWrap: "wrap"}}>
                            {beerOne?.hashtag.map((item, idx)=>(
                                idx < 3 ? "": 
                                <TasteTag>
                                    <span>#{item}</span>
                                </TasteTag>
                            ))}
                            </div>

                            <div style={{display: "flex", marginLeft: "32px"}}>
                                <div style={{display: "flex", margin: "5px 7px"}}>
                                    <StarIcon style={{backgroundImage: `url(${star})`}}/>
                                    <NumberText>
                                        {beerOne?.avgRate.toFixed(1)}
                                        
                                    </NumberText>
                                </div>
                                <div style={{display: "flex", margin: "5px 7px"}}>
                                    <LikeIcon style={{backgroundImage: `url(${like})`}}/>
                                    <NumberText>
                                        {beerOne?.like_array.length}
                                    </NumberText>
                                </div>
                            </div>
                        </div>
  
                    </Wrap>
                    <Line/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>맥주소개</span>
                        {hashtag ?
                        <BeerContent>
                            <p>
                                <span>{beerOne?.name_korean}</span> 맥주는 <span>'{hashtag[1]}'</span> 도수를 지닌 <span>{hashtag[0]}</span> 맥주입니다.
                                <span>{hashtag[2]}</span>이 매력적인 친구죠.🍺
                                최근 떠오르는 맥주 중 하나로 요즘 같은 무더운 여름날 인기있는 맥주입니다.
                                
                                <br/>
                                <br/>
                                오늘 <span>{beerOne?.name_korean}</span> 한잔 어떠세요?
                            </p>
                        </BeerContent> :null}
                    </Wrap>
                    <Line/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>Taste 그래프</span>                      
                    </Wrap>
                    <Graph>
                        <TasteGraph 
                        beers={scrollHeightInfo > 150 ? 
                            beerOne?.features
                        : ""
                        }/>
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
                        <p style={{ fontWeight: "700" ,paddingBottom: "7px"}}>제보된 판매처</p>
                        <div style={{display: "flex"}}>
                        <MapIcon style={{backgroundImage: `url(${mapIcon})`}}/>                        
                        {reportedPlace()}                        
                        </div>

                        <PlaceButton 
                            onClick={clickPlaceReport}
                        >장소 제보하기</PlaceButton>
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
                        <div style={{marginLeft: "-20px"}}>
                        <ReviewWriteModal
                            open={modalOpen}
                            close={closeModal}
                            beerOne={beerOne}
                            is_edit={false}
                        ></ReviewWriteModal>
                        </div> 
                        <WriteButton 
                            onClick={() => {
                            loginConfirm();
                        }}></WriteButton>
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
    bottom: 110px;
    & > span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: auto;
        text-align:left;
    }
`;
const Grid = styled.div`
    //width: 100%;
    width: 360px;
    margin: 0 auto;
    margin-top: 40px;
`;

const BeerImage = styled.div`
    margin: 0 auto;
    width: 360px;
    height: 380px;
    background-color: #F6F6F6;
    & > img{ 
        width: 315px;
        height: 315px;
        margin: 24px 0 22px 20px;
        
    }
    @media (img: img) {
        & > img { 
            width: 315px;
            height: 315px;
            margin: 24px 0 22px 20px;
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
    border: 0;
    border:solid #c4c4c4;
    border-width: 0.5px;
`
const LineShort = styled.hr`
    width: 312px;
    text-align: center;
    border: 0;
    border:solid #c4c4c4;
    border-width: 0.5px;
`
const HeartWrap = styled.div`
    width: 38px;
    height: 38px;
    display: flex;
`;


const BeerName = styled.p`
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    width: 250px;
    overflow: hidden;
    white-space: nomal;
`;

const BeerNameEng = styled.p`
    margin: 0;
    bold: bolder;
    margin-top: -5px;
    padding: 3px 3px;
`
const NumberText = styled.span`
    margin-left: 2px;
    font-wright: 400;
    font-style: normal;
    font-size: 10px;
    color: #FFC44F;

`
const BeerContent = styled.div`
    padding: 14px 0;
    margin: 0;
    width: 300px;
    & > p{
        margin-bottom: -0.2em; 
        font-weight: 500;
        font-style: normal;
        font-size: 14px;
        line-height: 20.27px;
        & > span {
            font-weight: 650;
            font-style: normal;
        }        
    }
   
`;

const Graph = styled.div`
    margin: 20px auto;
    padding: 24px;
    display: flex;
    width: 250px;
    height: 250px;
    border: 2px solid #C4C4C4;
    border-radius: 10px;
`;

const MapIcon = styled.div`
    width: 8px;
    height: 12px;
    margin-right: 5px;
`;

const PlaceButton = styled.button`
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
    cursor: pointer;
`;

const TasteTag = styled.div`
    display: inline-block;
    margin-top: 2px; 
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
/*//리뷰들 뿌옇게 하는 효과
const Gradient = styled.div`
    margin: 0 auto;
    //position: relative;
    z-index: 1;
    -webkit-mask-size: 312px 420px; 
    -webkit-mask-image: -webkit-gradient(linear, center bottom, center top,
    color-stop(1.00, rgba(0,0,0,1)), 
    color-stop(0.00, rgba(0,0,0,0)));
`;
*/

const Gradient = styled.div`
    z-index: 1;
    margin: 0 auto;
    margin-bottom: 74px;
`
const JustifyAlign = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StarIcon = styled.div`
    background-size: cover;
    width: 11px;
    height: 11px;

`
const LikeIcon = styled.div`
    background-size: cover;
    width: 12px;
    height: 12px;

`
// const WriteButtonWrap = styled.div`
//     width: 360px;
//     margin: 0 auto;
// `;

const WriteButton = styled.div`
    position: fixed;
    bottom: 96px;
    left: 50%;
    margin-left: 120px;
    width: 60px;
    height: 60px;
    background-image: url(${writeIcon});
    background-size: cover;
    cursor: pointer;
    //animation: scaleUp 1.0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    //@keyframes zoomOut { from { transform: scale(1); } to { transform: scale(0); } }
`;


