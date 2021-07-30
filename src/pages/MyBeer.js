import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import Slider from "../componentsBeer/Slider";
import EachBeer from "../componentsBeer/EachBeer";
import MyReview from "../componentsMypage/MyReview";
import Header from "../Header";
import "./myBeer.css";

const MyBeer = ()=>{
    const [is_Dogam, setIs_Dogam] = useState(true);
    const session = sessionStorage.getItem("token");
    useEffect(()=> {
        setIs_Dogam(true);
    }, [])

    useEffect(() => {
        if(!session){
            window.alert("로그인이 필요한 서비스입니다!")
            history.push("/")
        }
    })

    const mydogam = [
        {
            category: 'lager',
            name: '곰표 밀맥주' , 
            eng_name: 'Gompyo Wheat Beer',
            hash_tag: ['달달', '과일향', '상큼함']},
        {
            category: 'lager',
            name: 'Y끼리 IPA',
            eng_name: 'IPA with Y',
            hash_tag: ['달달', '과일향', '상큼함']},
    ];      
    return (
        <React.Fragment>
            <Header></Header>
        <Grid>
            <Wrap>  
            <ButtonContainerWrap> {/* 세밀한 padding 조절은 이후에 ..!=> 수정했습니다! */}
                <button
                    className={is_Dogam === true ? "clickedButtonContainer" : "buttonContainer"}
                    onClick={()=>{
                        setIs_Dogam(true)
                    }}>
                    맥주 도감
                </button>
                <button 
                    className={is_Dogam === false ? "clickedButtonContainer" : "buttonContainer"}
                    onClick={()=>{
                        setIs_Dogam(false)
                    }
                    }>
                    내가 쓴 게시물
                </button>
            </ButtonContainerWrap>
            <SliderWrap>
            <Slider
                    items={[
                        "All",
                        "Lager",
                        "Pilsner",
                        "Pale Ale",
                        "IPA",
                        "Weizen",
                        "Dunkel",
                        "Stout",
                    ]}/>
            </SliderWrap>
            {is_Dogam == true ? 
                <List>
                {mydogam.length > 0 ? mydogam.map((item, idx) => (
                    <EachBeer key={idx} {...item} 
                        _onClick={() =>{
                            history.push("/beer/detail")
                        }
                    }/>
                )):""}
                </List>
            : <MyReview/>
            
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

const ButtonContainerWrap = styled.div`
    display: flex;
    width: 312px;
    margin: 0 auto;
    margin-bottom: 17px;
    justify-content: space-between;
`;

const Wrap = styled.div`
    width: 360px;
    margin: 0 auto;
    margin-top: 65px;
`;

const SliderWrap = styled.div`
    margin: 0 0 20px 0px;
`;

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

