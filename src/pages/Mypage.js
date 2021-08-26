import React,{ useState ,useEffect} from 'react';
import styled from 'styled-components';
import { logOut } from "../redux/async/user";
import { useDispatch } from "react-redux";
import MyPageModal from "../componentsMypage/MyPageModal";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import UserPreference from '../componentsMypage/UserPerference';
import { useSelector } from "react-redux";
import {history} from "../redux/configureStore"

const arrow = "/images/suggestarrow.png";

const MyPage = (props) => {
    const userInfos = useSelector(state => state.user.currentUser);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const [modal_info, setModal_Info] = useState({ //건의하기 modal창 text정보
        suggestTitle: "",
        titlePlaceholder: "",
        commentPlaceholder: "",
    });
    
    const openModal = () => { //modal창 오픈
        setModalOpen(true);
      };

    const closeModal = () => { // 모달창 닫기 및 텍스트 초기화
        setModalOpen(false);
        setModal_Info({
            suggestTitle: "",
            titlePlaceholder: "",
            commentPlaceholder: "",
        });
    };

    const comfirm_login = ()=>{
        if(userInfos.message === "success"){
            
            return(
                <LogOutWrap>
                    <LogOutButton
                        style={{fontFamily: "Noto Sans KR"}}
                        onClick={confirmLogout}
                    >로그아웃
                    </LogOutButton>
                </LogOutWrap>
            )        
        }
    }

    const confirmLogout = () => { // 로그아웃
        if(window.confirm("로그아웃 하시겠어요?")){
            dispatch(logOut());
        }
    }

    return (
        <>
        <Container>
            <Header/>
            <UserPreference>
            </UserPreference>
            <PageMoveWrap>
                <MoveBoxWrap
                    onClick={() => {
                        setModal_Info({
                            suggestTitle: "맥주 건의하기",
                            titlePlaceholder: "맥주 이름",
                            commentPlaceholder: "맥주에 대한 설명을 적어주세요.",
                        })
                        openModal();
                    }}>
                    <span>맥주 건의하기</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MoveBoxWrap
                    onClick={() => {
                        setModal_Info({
                            suggestTitle: "관리자에게 건의하기",
                            titlePlaceholder: "제목을 입력해주세요.",
                            commentPlaceholder: "건의 내용을 입력해주세요.",
                        })
                        openModal();
                    }}>
                    <span>관리자에게 건의하기</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MoveBoxWrap
                    onClick={() => {
                        window.location.href = "https://docs.google.com/forms/d/16Rv2SKdodPuZ5YB2w_7Ei-jvKJVwKCFyut61Lk71ctM"
                    }}
                >
                    <span>설문조사 하러가기</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MyPageModal
                        suggestInfo={modal_info}
                        open={modalOpen}
                        close={closeModal}
                ></MyPageModal>

                {comfirm_login()}
                
            </PageMoveWrap>
            <NavigationBar props={props}/>
        </Container>
        </>
    )
};

export default MyPage;

const Container = styled.div`
    width: 100%;
`;

const PageMoveWrap = styled.div`
    width: 360px;
    display: flex;
    flex-direction: column;
    test-align: center;
    margin: 0 auto;
    margin-top: 36px;
`;

const MoveBoxWrap = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 312px;
    height: 40px;
    border-bottom: 0.5px solid #C4C4C4;
    margin-bottom: 16px;
    cursor: pointer;
    & > span{
        line-height: 40px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: bold;
    }
`;

const ArrowImage = styled.img`
    float: right;
    margin: 14px;
    width: 5px;
    height: 10px;
`;
const LogOutWrap = styled.div`
    margin: 0 auto;
    width: 360px;
    justify-content: space-around;
    display: flex;
    position: absolute;
    bottom: 100px;
`;

const LogOutButton = styled.div`
    margin: 0 auto;
    width: 70px;
    height: 23px;
    border: none;
    background-color: transparent;
    color: #FFC44F;
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    font-family : inherit;
`;