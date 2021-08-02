import React,{useState} from "react";
import styled from "styled-components";

import EachReview from "../componentsBeer/EachReview";
import { useDispatch } from "react-redux";
import {history} from "../redux/configureStore";

import ReviewWriteModal from "../componentsBeer/ReviewWriteModal";
import Header from "../Header";


const ReviewList = (props)=>{
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [input, setInput] = useState();
    const [modal_info, setModal_Info] = useState({
        suggestTitle: "",
        titlePlaceholder: "",
        commentPlaceholder: "",
    });
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
    const onChange = (e) => {
        setInput(e.target.value)
    }
    const EnterSubmit = (e) => {
        if(e.key == "Enter"){
            console.log("input:",input);
            setInput("");
            closeModal();
        }
    }

    const reviews = [
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },
        {
            nickname: "닉네임",
            rate: "4.0",
            review : "UserReview"
        },

    ];
    return (
        <React.Fragment>
            <Container>
                <MoveBoxWrap
                        onClick={() => {
                            openModal();
                        }}>
                        <span>후기 작성하기</span>
                </MoveBoxWrap>
                <Grid>
                    {reviews.length > 0 ? reviews.map((item, idx) => (
                        <EachReview key={idx} {...item}/> 
                    )):""}            
                </Grid>

                <ReviewWriteModal
                    suggestInfo={modal_info}
                    EnterSubmit={EnterSubmit}
                    onChange={onChange}
                    chat={input}
                    open={modalOpen}
                    close={closeModal}
                ></ReviewWriteModal>               
            </Container>

        </React.Fragment>
    )
}

export default ReviewList;

const Container = styled.div`
    display: flex;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
`

const MoveBoxWrap = styled.div`
    width: 360px;
    height: 40px;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    position: fixed;
    bottom: 0;
    z-index: 99;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 12px;
        font-weight: bold;
    }
`;