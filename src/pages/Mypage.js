import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { logOut } from "../redux/reducer/userSlice";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import MyPageModal from "../componentsMypage/MyPageModal";
import Header from "../Header";
import arrow from "../share/image/suggestarrow.png";

const MyPage = (props) => {
    const session = sessionStorage.getItem("token");
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

    const confirmLogout = () => { // 로그아웃
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
                            commentPlaceholder: "맥주에 대한 설명을 적어주세요!",
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
                            commentPlaceholder: "건의할 내용을 적어주세요!",
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
                    style={{fontFamily: "Noto Sans KR"}}
                    onClick={confirmLogout}
                >
                    로그아웃
                </LogOutButton>
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
    width: 312px;
    height: 40px;
    border-bottom: 0.5px solid #C4C4C4;
    margin-bottom: 16px;
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

const LogOutButton = styled.button`
        position: absolute;
        width: 90px;
        height: 23px;
        bottom: 50px;
        left: 50%;
        transform: translate(-30px, 0);
        border: none;
        background-color: transparent;
        color: #FFC44F;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        font-family : inherit;
`;