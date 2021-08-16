import React from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";
import moment from 'moment';
import 'moment/locale/ko';
import {TasteGraph,StarRate} from "../componentsBeerDetail/BeerDetailIndex";
import Header from "../Header";

const MyReview = (props) =>{
    const item = props.location.state; //
    const date = moment(item?.date);
    const is_my = true;

    return(
        <React.Fragment>
            <Header/>
            <Grid>
            <Container>
                <Div>
                    <Title><span>내가 쓴 게시물</span></Title>
                    <WritedBeerInfo >
                        <BeerImage>
                            <img src={item?.beerId?.image}></img>
                        </BeerImage>
                        <BeerTextWrap>
                            <span>{item?.review}</span>
                        </BeerTextWrap>
                    </WritedBeerInfo>
                    <Text><span>별점</span></Text>                      
                    <div style={{margin: "0 auto"}}>
                        <StarRate 
                        style={{//touchAction: "none",
                                pointerEvents : "none"
                              }}
                        init_star={item.rate} is_my={is_my}/>
                    </div>
                    <Graph>
                        <TasteGraph beers={item?.myFeatures}/>
                    </Graph>
                    <div style={{textAlign: "center"}}>
                    </div>
                </Div>
                

            </Container>
            </Grid>
        </React.Fragment>
    )
}
export default React.memo(MyReview);

const Grid = styled.div`
    width: 100%;
`;


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
const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: legt; 
    margin: 70px 20px;
    
    & > span{
        float: left;
        font-weight: 700;
    }
`

const Title = styled.div`
    padding-left: -100px;
    text-aligh: left;
    & > span{
        font-weight: 700;
        font-size: 14px;
        line-height: 20.27px;

    } 
`
const Text = styled.div`
    margin: 20px 0 0 0;;
    text-align: center;
    & > span{
        font-size: 14px;
        font-weight: 700;
        line-height: 20.27px;
    }

`
const WritedBeerInfo = styled.div`
    display: flex;
    margin: 0 auto;
`;

const BeerImage = styled.div`
    margin:  10px 5px;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: #FFFFFF;
    border: 1px solid #c4c4c4;
    & > img{
        width: 100px;
        height: 100px;
    }
`;

const BeerTextWrap = styled.div`
    margin: 10px 5px;
    width: 208px;
    height: 100px;
    
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    & > span{
        float: left;
        margin: 10px;
        font-size: 12px;
        font-weight: 300;
        line-height: 17.38px;
    }
`;


const Graph = styled.div`
    margin: 20px auto;
    padding: 24px;
    display: flex;
    width: 270px;
    height: 270px;
    border: 2px solid #C4C4C4;
    border-radius: 10px;
`;
