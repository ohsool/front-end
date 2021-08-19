import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import {suggestBeer, suggestComment} from "../redux/async/suggest";
import closeIcon from "../share/image/suggestclose.png"

const MyPageModal = (props) => {
    const dispatch = useDispatch();
    // const [chat, setChat] = useState();
    const [suggestChat, setSuggestChat] = useState({
        title: "",
        chat: "",
    })
    const {title, chat} = suggestChat
    const { open, close, suggestInfo } = props;

    const onChange = (e) => {
        setSuggestChat({...suggestChat, [e.target.name]: e.target.value});
    }

    // suggestTitle이 맥주 건의하기면은 맥주건의하기로 modal띄우고
    // 아닐경우 관리자에게 건의하기
    const EnterSubmit = (e) => {
        //console.log(suggestChat);
        if(e.key === "Enter"){
            if(suggestInfo.suggestTitle === "맥주 건의하기"){
                dispatch(suggestBeer({
                    beer: title,
                    description: chat,
                    location: "여삼빌딩",
                    image: "맥주",
                }));
                setSuggestChat({
                    title: "",
                    chat: "",
                });
                close();
            }
        else{
            dispatch(suggestComment({
                title: title,
                description: chat
            }));
            setSuggestChat({
                title: "",
                chat: "",
            });
            close();
        }
        }
    }

    return(
        <React.Fragment>
            {open ?
            <Background>
                <WhiteSpace
                    onClick={close}
                ></WhiteSpace>
                <ModalWrap >
                    <div style={{margin: "0 auto", width: "318px"}}>
                    <SuggestTitle>
                        <span>{suggestInfo.suggestTitle}</span>
                    </SuggestTitle>
                    </div>
                    <CloseIcon
                        style={{backgroundImage: `url(${closeIcon})`}}
                        onClick={close}
                    >
                    </CloseIcon>
                    <SuggestInputTitle
                        placeholder={suggestInfo.titlePlaceholder}
                        value={title}
                        name="title"
                        onChange={onChange}
                    >

                    </SuggestInputTitle>
                    <SuggestInput
                        value={chat}
                        name="chat"
                        onChange={onChange}
                        onKeyPress={EnterSubmit}
                        placeholder={suggestInfo.commentPlaceholder}
                    ></SuggestInput>
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
    z-index: 9999;
    display: flex;
    justify-content: center;
`;

const WhiteSpace = styled.div`
    width: 100vw;
    height: 100vh;
`;

const ModalWrap = styled.div`
    position: absolute;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    bottom: 0px;
    width: 100%;
    padding-bottom: 20px;
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

const SuggestInput = styled.textarea`
    height: 180px;
    width: 312px;
    padding: 15px;
    margin: 0 auto;
    border: none;
    outline: none;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 12px;
`;

const SuggestInputTitle = styled.input`
    width: 312px;
    height: 40px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 12px;
    outline: none;
    margin: 0 auto;
    border: none;
    background: #FFFFFF;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 10px;
`;

const SuggestTitle = styled.div`
    height: 50px;
    width: 280px;
    text-align: left;
    & > span {
        position: absolute;
        margin: 20px 0 0 10px;
        font-size: 14px;
        font-weight: 700;
    }
`;

const CloseIcon = styled.div`
    position: absolute;
    right: 24px;
    top: 22px;
    background-size: cover;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
`;