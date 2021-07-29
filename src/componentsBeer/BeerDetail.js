import React,{useState} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import TasteGraph from "./TasteGraph";
//import axios from "Axios";
const BeerDetail = () =>{
    const [toggle, setToggle] = useState(false);

    const beer_detail = 
        {
            name: "곰표 밀맥주",
            eng_name: "Gompyo Wheat beer",
            hash_tag: "달달",
            introduce: "",
            //graph: "",
            store: ["GS25 편의점", "현대백화점 식품관"],
            other_store: ["CU 편의점 여의도역 R점"],
        }
    
    
    return(
        <React.Fragment>
            <Container>
                <Img>
                    {/*<img src="/"/>*/}
                </Img>

                <Grid>
                    <span style={{ fontWeight: "700", fontSize: "20px", lineHeight: "29px"}}>{beer_detail.name}</span>
                    <span>{beer_detail.eng_na}</span>
                    <span style={{ fontWeight: "400", fontSize: "10px", lineHeight: "14.5px"}}>#{beer_detail.hash_tag}</span>

                    <div style={{ width: "38px", height: "38px", borderRadius: "50%" ,display: "flex", border: "1px solid #212121"}}>
                        <HeartButton
                            _onClick={(e) => {
                                toggle ? setToggle(false) : setToggle(true);
                                e.preventDefault();
                                e.stopPropagation();              
                            }}
                            is_like={toggle}                    
                        />
                    </div>
                </Grid>
                <hr/>

                <Grid>
                    <span style={{ fontWeight: "700"}}>맥주소개</span>
                    <span style={{ padding: "14px 0"}}>스위트하게~~~~~~</span>
                </Grid>

                <Grid>
                    <span style={{ fontWeight: "700"}}>그래프</span>

                    <Graph>
                        <TasteGraph/>
                    </Graph>

                </Grid>
                <hr/>

                <Grid>
                    <span style={{ fontWeight: "700"}}>판매처</span>

                    


                </Grid>
                <hr/>
                
                <Grid>
                    <span style={{ fontWeight: "700"}}>제보된 판매처</span>
                    
                    <ReportButton>장소 제보하기</ReportButton>



                </Grid>
                <hr/>

            </Container>



        </React.Fragment>

    )

}

export default BeerDetail;



const Container = styled.div`
    
    span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-align:left;
    }
`
const Img = styled.div`
    width: 360px;
    height: 380px;
    border-radius: 10px;
    background-color: #F6F6F6;
    margin: -8px; 
    img{ 
        //들어갈 예정
    }

`

const Grid = styled.div`
    width: 274px;
    margin: 20px 24px

`

const Graph = styled.div`
    width: 313px;
    height: 313px;
`

const ReportButton = styled.button`
    width: 308px;
    height: 45px;
    border-radius: 50px;
    border: 1px solid #FFC44F;
    background-color: #fff;


`