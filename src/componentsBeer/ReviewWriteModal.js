import React ,{useEffect, useState} from "react";
import styled from "styled-components";
import "./ReviewWriteModal.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SelectBar from "./SelectBar";
import StarRate from "./StarRate";
const ReviewWriteModal = (props) => {
    const { open, close, EnterSubmit, onChange, chat } = props;
    const taste_data = ["쓴맛", "단맛", "고소한맛", "청량감", "향"];
    const [starScore, setStarScore] = useState(5);
    console.log("Modal_starscore", starScore);
    //별점
    // const [score, setScore] = useState(5);
    // const totalStarCount = 5;   
    // const starCount = score;
    // const [review, setReview] = useState({ rate: 5});

    
    // const removeCount = totalStarCount - starCount;

    // const handleScore = (score) => {
    //     setReview({
    //     ...review,
    //     rate: score,
    //     });
    // };

    return(
        <React.Fragment>
            {open ? 
            <Background>
                <ModalWrap>
                    <SuggestTitle onClick={close}>
                        <span>리뷰 쓰기</span>
                    </SuggestTitle>
                    <CloseIcon onClick={close}/>
                    <BeerInfo>
                            <BeerImage/>
                            <BeerTextarea 
                                    value={chat}
                                    onChange={onChange}
                                    onKeyPress={EnterSubmit}
                                    placeholder="맥주에 대한 평가와 소감을 적어주세요.(최대 48자)">

                            </BeerTextarea>
                    </BeerInfo>
                    <ScoreWrap>
                            <Div> {/* 별점 묶음 */}
                                <span style={{margin: "0 auto",fontWeight: "bold"}}>별점</span>
                                <StarRate
                                    setStarScore={setStarScore}
                                />
                            </Div>

                            <div>
                            <TasteFlavorWrap> {/* 질문 유형 */}
                                {taste_data.map((taste) => 
                                    (<span>{taste}</span>)
                                )}
                            </TasteFlavorWrap>

                            <TasteScoreWrap> {/* 셀렉트 바 */}
                                {taste_data.map((taste) => (
                                    <SelectBar/>
                                ))}
                                <TasteScore>
                                </TasteScore>
                            </TasteScoreWrap>
                            </div>
                        <ReviewButton>
                            <button onClick={() => {}}>도감 작성하기</button>
                        </ReviewButton>

                    </ScoreWrap>


                </ModalWrap>
            </Background>
            : null }
        </React.Fragment>
    )
}

export default ReviewWriteModal;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    z-index: 9999;
    display: flex;
    justify-content: center;
`;

const ModalWrap = styled.div`
    position: fixed;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    background-color: #FDF9F0;
    border-radius: 10px 10px 0 0;
    bottom: 0px;
    width: 360px;
    display: flex;
    flex-direction: column;
    @keyframes scaleUp {
        0% {
            transform: scale(.8) translateY(1000px);
            opacity: 0;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;

const ScoreWrap = styled.div`
    width: 360px;
    box-sizing: border-box;
    margin: 0 auto;
`;
const SuggestTitle = styled.div`
    height: 50px;
    width: 280px;
    text-align: left;
    & > span {
        position: absolute;
        margin: 20px 0 0 24px;
        font-size: 14px;
        font-weight: bold;
    }
`;


const CloseIcon = styled.div`
    position: absolute;
    right: 24px;
    top: 22px;
    width: 16px;
    height: 16px;
    border: 1px solid black;
`;



const TasteFlavorWrap = styled.div`
    margin-left: 35px;
    display: inline-block;
    width: 59px;
    height: 238px;
    & > span {
        margin: 28px 0;
        display: block;
        font-size: 14px;
        font-weight: 700;
        line-height: 20.27px;
        margin-bottom 13px;
    }
`;


const BeerInfo = styled.div`
    width: 328px;
    display: flex;
    margin: 10px auto;
`;

const BeerImage = styled.div`
    border-radius: 10px;
    margin: 0 10px;
    width: 100px;
    height: 100px;
    background-color: #FFFFFF;
`;

const BeerTextarea = styled.textarea`
    outline: none;
    width: 188px;
    padding: 10px;
    height: 80px;
    resize:none;
    border-radius: 10px;
    border: none;
`;

const Div = styled.div`
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    
`
const ReviewButton = styled.div`
    width: 308px;
    margin: 8px auto;
    button{
        width: 308px;
        height: 45px;
        border-radius: 50px;
        border: 2px solid #FFC44F;
        color: #FFC44F;
        font-weight: bold;
        background-color: transparent;
    }

`
const TasteScoreWrap = styled.div`
    width: 200px;
    height: 240px;
    display: inline-block;
    margin: 0 0 0 6px;
`;

const TasteScore = styled.div`
    width: 190px;
    height: 30px;
    margin-bottom: 13px;
`;
