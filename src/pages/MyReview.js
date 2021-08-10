import React from "react";
import styled from "styled-components/macro";
import {history} from "../redux/configureStore";
import moment from 'moment';
import 'moment/locale/ko';
import {TasteGraph,StarRate} from "../componentsBeer/BeerIndex";
import Header from "../Header";

const MyReview = (props) =>{
    const item = props.location.state;
    const date = moment(item?.date);

    // 별점, 그래프, 리뷰 정보
    return(
        <React.Fragment>
            <Header/>
            <Container>
                <Div style={{margin: "70px auto 20px"}}>
                <BeerImage>
                        <img src={item?.beerId?.image}></img>
                </BeerImage>
                </Div>
                
                <ReviewText>
                    <span>{moment(date).fromNow()}</span>
                    <p>{item?.review}</p>
                </ReviewText>
                <Line/>
                <Grid>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>별점</span>                      
                    </Wrap>
                    <Div>
                    <StarRate init_star={item.rate}/>
                    </Div>
                    <Line/>
                    <Wrap>
                        <span style={{ fontWeight: "700"}}>그래프</span>                      
                    </Wrap>
                    <Graph>
                       <TasteGraph beers={item?.myFeatures}/>
                    </Graph>
                    <Line/>
                    <div style={{textAlign: "center"}}>
                    <GoBackButton onClick={()=>{
                        history.goBack();
                    }}>
                        마이비어 가기
                    </GoBackButton>
                    </div>
                </Grid>
            </Container>
        </React.Fragment>
    )
}
export default React.memo(MyReview, TasteGraph);

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
`;


const BeerImage = styled.div`
    margin: 10px;
    border-radius: 10px;
    width: 150px;
    height: 150px;
    background-color: #FFFFFF;
    & > img{
        width: 150px;
        height: 150px;
    }
    @media (img: img) {
        & > img { 
            width: 150px;
            height: 150px;
         }
    }
`;

const ReviewText = styled.div`
    margin: 0 auto;
    width: 312px;
    & > p {
        margin: 0;
        font-size: 14px;
        padding: 10px 0px;

    }
    & > span{
        font-size: 12px;
        font-weight: 300;
        height: 46px;
    }
    padding: 10px;
    min-height: 120px;
    resize:none;
    background-color: #F6F6F6;
    border-radius: 10px;

`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;  
`
const Line = styled.hr`
    width: 360px;
    text-align: center;
    border:0.5px solid #c4c4c4;
`

const Wrap = styled.div`
    width: 320px;
    margin: 30px 10xp;
`;

const Graph = styled.div`
    margin: 14px auto;
    display: flex;
    width: 313px;
    height: 313px;
    border: 2px solid #FFC44F;
    border-radius: 10px;
`;

const GoBackButton = styled.button`
    width: 160px;
    height: 45px;
    border-radius: 50px;
    border: 1px solid #FFC44F;
    background-color: #fff;
    margin-top: 16px;
    cursor: pointer;
`;