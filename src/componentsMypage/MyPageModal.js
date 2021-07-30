import React from "react";
import styled from "styled-components";
import "./myPageModal.css";

const MyPageModal = (props) => {
    const { open, close, suggestInfo, EnterSubmit, onChange, chat } = props;

    return(
        <React.Fragment>
            {open ? 
            <Background>
                <ModalWrap >
                    <SuggestTitle onClick={close}>
                        <span>{suggestInfo.suggestTitle}</span>
                    </SuggestTitle>
                    <CloseIcon
                        onClick={close}
                    >
                    </CloseIcon>
                    <textarea 
                        className={suggestInfo.suggestTitle !== "맥주 건의하기" ? 
                        "whiteInput" : "yellowInput"
                        }
                        value={chat}
                        onChange={onChange}
                        onKeyPress={EnterSubmit}
                        placeholder={suggestInfo.commentPlaceholder}
                    ></textarea>
                </ModalWrap>
            </Background>
            : null }
        </React.Fragment>
    )
}

export default MyPageModal;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    z-index: 10;
    display: flex;
    justify-content: center;
`;

const ModalWrap = styled.div`
    position: absolute;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    background-color: #FFFFFF;
    border-radius: 10px 10px 0 0;
    bottom: 0px;
    width: 360px;
    height: 310px;
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
