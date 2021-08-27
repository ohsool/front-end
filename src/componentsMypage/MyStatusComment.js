import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    followUser, 
    unFollowUser, 
    checkFollowUser,
    changeMyDescription
} from "../redux/async/mybeer";
import { useParams } from "react-router-dom";

const MyStatusComment = ({ userInfos, is_me }) => {
    const followers = useSelector(state => state.mybeer.followers);
    const [toggle, setToggle] = useState(false);
    const [is_Edit, setIs_Edit] = useState(true);
    const [comment, setComment] = useState("");
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [text, setText] = useState("나는 오늘도 맥주를 마신다.. 나는 맥주 일진짱이기 때문이다. 나는 오늘도 맥주를마신다..나는 맥주 일진짱")
    
    useEffect(() => {
        dispatch(checkFollowUser(userId));
    }, []);

    useEffect(() => {
        if(followers.includes(userInfos.userId)){
            setToggle(true);
        }else{
            setToggle(false);
        }
    }, [followers, userInfos])

    const editStatusComment = () => {
        if(is_Edit){
            setIs_Edit(false);
        }else{
            setIs_Edit(true);
        }
    }

    const onChange = (e) => {
        setComment(e.target.value);
    }
    const enterKeyPress = (e) => {
        if(e.key === "Enter"){
            changeStatuscomment();
        }
    }
    const changeStatuscomment = () => {
        setText(comment);
        setIs_Edit(true);
        dispatch(changeMyDescription(comment));
    }

    const nonClickedButton = {
        backgroundColor: "#FFFFFF",
        border: "1px solid #FFC44F",
        color: "#FFC44F"
    }
    const dispatchFollowData = {
        otheruserId: userId,
        userId: userInfos.userId
    }
    const clickFollowButton = () => {
        if(!toggle){
            setToggle(true)
            dispatch(followUser(dispatchFollowData));
        }else{
            setToggle(false)
            dispatch(unFollowUser(dispatchFollowData));
        }
    }

    return(
        <React.Fragment>
            <Container>
                <CommentWrap>
                    {is_Edit ? <span>
                        {text}
                    </span>
                    :
                    <textarea
                        onKeyPress={enterKeyPress}
                        value={comment}
                        onChange={onChange}
                    ></textarea>
                    }
                </CommentWrap>
                <FollowOrCommentButtonWrap>
                    {is_me ? 
                    <CommentButton
                        onClick={editStatusComment}
                    >상태명 수정</CommentButton>
                :
                    <FollowButton
                        style={toggle ? null : nonClickedButton}
                        onClick={clickFollowButton}
                    >{toggle ? "팔로우 취소": "팔로우"}
                    </FollowButton>
                }
                    <span>팔로워 {followers?.length}</span>
                </FollowOrCommentButtonWrap>
            </Container>
        </React.Fragment>
    )
}

export default MyStatusComment;

const Container = styled.div`
    display: flex;
    width: 360px;
    margin: 0 auto;
`;

const CommentWrap = styled.div`
    width: 197px;
    height: 54px;
    font-size: 12px;
    margin: 20px;
    & > span {
        color: #151515;
        font-family: Noto Sans KR;
    }
    & > textarea {
        width: 197px;
        height: 54px;
        border: 1px solid #151515;
        outline: none;
    }
`;

const FollowOrCommentButtonWrap = styled.div`
    margin: 20px 0 0 10px;
    text-align: center;
    & > span {
        font-size: 10px;
        color: #151515;
        font-family: Noto Sans KR;
    }
`;

const FollowButton = styled.button`
    display: block;
    width: 85px;
    height: 30px;
    background-color: #FFC44F;
    color: #151515;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const CommentButton = styled.button`
    display: block;
    width: 85px;
    height: 30px;
    color: #151515;
    font-size: 12px;
    background-color: #FFFFFF;
    border: 1px solid #151515;
    border-radius: 5px;
    cursor: pointer;
`;