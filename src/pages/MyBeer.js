import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { getMyDogam, getMyReview } from "../redux/async/mybeer";
import { userInfo } from "../redux/async/user";
import { likeList, myReviewList } from "../redux/reducer/mybeerSlice";

import EachBeer from "../componentsBeer/EachBeer";
import Header from "../Header";
import "../share/style/myBeer.css";
import WritedReview from "../componentsMypage/WritedReview";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../share/Cookie";

const MyBeer = (props)=>{
    const mydogam = useSelector(likeList); //좋아요한 맥주 리스트
    const myReview = useSelector(myReviewList); //사용자가 단 리뷰리스트
    const [is_Dogam, setIs_Dogam] = useState(true); //맥주리스트인지 리뷰리스트인지
    const is_login = getCookie("_osid");
    const dispatch = useDispatch();

    useEffect(()=> {
        setIs_Dogam(true);
        async function getData(){
            await dispatch(getMyDogam()); //좋아요한 맥주 리스트 디스패치
            await dispatch(getMyReview()); //사용자가 쓴 리뷰리스트 디스패치
            await dispatch(userInfo()); //현재 로그인한사용자 정보 (새로고침시 상태 날라가는 것 방지)
        }
        return getData();
    }, [])


    useEffect(() => {
        if(!is_login){
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login")
                return;
            }else{
                history.goBack("/")
            }
        }
    }, []);

    return (
        <React.Fragment>
            <Header></Header>
        <Grid>
            <Wrap>  
            <ButtonContainerWrap>
                <button
                    className={is_Dogam === true ? "clickedButtonContainer" : "buttonContainer"} //클릭시 css변경
                    onClick={()=>{
                        setIs_Dogam(true)
                    }}>
                    좋아요한 맥주
                </button>
                <button 
                    className={is_Dogam === false ? "clickedButtonContainer" : "buttonContainer"} //클릭시 css변경
                    onClick={()=>{
                        setIs_Dogam(false)
                    }
                    }>
                    내가 쓴 맥주도감
                </button>
            </ButtonContainerWrap>
            {is_Dogam === true ? 
                <List>
                {mydogam?.map((item, idx) => (
                    <EachBeer key={idx} item={item} 
                        _onClick={() =>{
                            history.push("/beer/detail")
                        }
                    }/>
                ))}
                </List>
            : 
                <Container>  {/* 데이터 이미지가공 까지해서 */}
                {is_Dogam === false ? 
                    myReview?.map((item, idx) => (
                        <WritedReview key={idx} item={item}
                        />
                    )) :
                    ""}
                </Container>
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

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Container = styled.div`
    margin-top: 10px;
`