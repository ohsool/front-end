import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { logOut } from "../redux/reducer/userSlice";
import { useDispatch } from "react-redux";
import {history} from "../redux/configureStore";

import MyPageModal from "../componentsMypage/MyPageModal";
import Header from "../Header";
import arrow from "../share/arrow.png";

const MyPage = (props) => {
    const dispatch = useDispatch();
    const session = sessionStorage.getItem("token");
    const [modalOpen, setModalOpen] = useState(false);
    const [modal_info, setModal_Info] = useState({
        suggestTitle: "",
        titlePlaceholder: "",
        commentPlaceholder: "",
    });

    // useEffect(() => {
    //     if(!session){
    //         window.alert("로그인이 필요한 서비스입니다!")
    //         history.push("/")
    //     }
    // }, []);

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
        setModal_Info({
            suggestTitle: "",
            titlePlaceholder: "",
            commentPlaceholder: "",
        });
    };

    const confirmLogout = () => {
        if(window.confirm("로그아웃 하시겠어요?")){
            dispatch(logOut());
        }
    }

    return (
        <>
        <Container>
            <Header></Header>
            <PageMoveWrap>
                <MoveBoxWrap onClick={()=> history.push('/mybeer')}>
                    <span>마이 비어</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MoveBoxWrap
                    onClick={() => {
                        setModal_Info({
                            suggestTitle: "맥주 건의하기",
                            titlePlaceholder: "맥주 이름을 입력해주세요",
                            commentPlaceholder: "맥주의 특징이나 추천하는 이유를 입력해주세요!",
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
                            titlePlaceholder: "제목을 입력하세요",
                            commentPlaceholder: "불편한 사항이나 건의할 내용을 입력해주세요!",
                        })
                        openModal();
                    }}>
                    <span>관리자에게 건의하기</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MyPageModal
                        suggestInfo={modal_info}
                        open={modalOpen}
                        close={closeModal}
                ></MyPageModal>
                <LogOutButton
                    onClick={confirmLogout}>로그아웃</LogOutButton>
            </PageMoveWrap>
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
    margin-top: 83px;
`;

const MoveBoxWrap = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 320px;
    height: 40px;
    background-color: #F6F6F6;
    border-radius: 5px;
    margin-bottom: 16px;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 12px;
        font-weight: bold;
    }
`;

const ArrowImage = styled.img`
    float: right;
    margin: 8px;
    width: 24px;
    height: 24px;
`;

const LogOutButton = styled.button`
    position: absolute;
    width: 59px;
    height: 23px;
    bottom: 50px;
    left: 50%;
    transform: translate(-30px, 0);
    border: none;
    background-color: transparent;
    color: #FFC44F
`;