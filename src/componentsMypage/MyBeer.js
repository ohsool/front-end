import React,{useState, useEffect} from "react";
import styled from "styled-components";
import {history} from "../redux/configureStore";
import Slider from "../componentsBeer/Slider";
import EachBeer from "../componentsBeer/EachBeer";
import MyReview from "./MyReview"

const MyBeer = ()=>{
    const [is_Dogam, setIs_Dogam] = useState();

    useEffect(()=> {
        setIs_Dogam(true);
        console.log(is_Dogam);

    }, [])

    const mydogam = [
        {
            category: 'lager',
            name: '곰표 밀맥주' , 
            eng_name: 'Gompyo Wheat Beer',
            //hash_tag: ['달달', '과일향', '상큼함']},
            hash_tag: '달달'},
        {
            category: 'lager',
            name: 'Y끼리 IPA', 
            eng_name: 'IPA with Y',
            hash_tag: '달달'},

    
    ];
       
    return (
        <React.Fragment>
        <Grid>
            <Wrap>  
            <div style={{ padding: "0 0 0 20px" }}> {/* 세밀한 padding 조절은 이후에 ..! */}
                <ButtonContainer onClick={()=>setIs_Dogam(true)
                    }>
                        맥주 도감
                </ButtonContainer>
                <ButtonContainer onClick={()=>setIs_Dogam(false)
                    }>
                        내가 쓴 게시물
                </ButtonContainer>
            </div>
            {/*<Slider/>*/}

            {is_Dogam == true ? 
                <List>
                {mydogam.length > 0 ? mydogam.map((item, idx) => (
                    <EachBeer key={idx} {...item} 
                        _onClick={() =>{}
                    }/>
                )):""}
                </List>
            : <MyReview/> //마이리뷰 페이지로 전환..!
            
            }
            </Wrap>
        </Grid>


        </React.Fragment>
    )
}

export default MyBeer;


const Grid = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;

const Wrap = styled.div`
    width: 360px;
    margin: 0 auto;
    margin-top: 105px;
    display: block;
`;
/*
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
        border: none;
        border-bottom: 2px solid #fff;
        width: 180px;
        height: 50px;
        background-color: #fff;
        :focus {
            border: none;
            border-bottom: 2px solid #212121;
        };
    }
`;
*/
const ButtonContainer = styled.button`
    float: left;
    width: 148px;
    height: 30x;
    margin: 0px 8px;
    padding: 16px;

    border: none;
    border-bottom: 2px solid #fff;
    background-color: #fff;
    :focus {
        border: none;
        border-bottom: 2px solid #212121;
    };
`;





const List = styled.div`
    width: 320px;
    margin: 0 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

