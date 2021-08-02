import React,{Fragment, useState} from "react";
import styled from "styled-components";

import EachReview from "../componentsBeer/EachReview";
import { useDispatch } from "react-redux";
import {history} from "../redux/configureStore";

import ReviewWriteModal from "../componentsBeer/ReviewWriteModal";
import Header from "../Header";

const ReviewWrite = () =>{

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

    return (
        <React.Fragment>
                <MoveBoxWrap
                    onClick={() => {
                        openModal();
                    }}>
                    <span>후기 작성하기</span>
                </MoveBoxWrap>
                <ReviewWriteModal
                        suggestInfo={modal_info}
                        EnterSubmit={EnterSubmit}
                        onChange={onChange}
                        chat={input}
                        open={modalOpen}
                        close={closeModal}
                ></ReviewWriteModal>


        </React.Fragment>

    )
}

export default ReviewWrite;

const MoveBoxWrap = styled.div`
    display: inline-block;
    width: 320px;
    height: 40px;
    margin: 0 auto;
    background-color: #F6F6F6;
    border-radius: 10px 10px 0 0;
    margin-bottom: 16px;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 12px;
        font-weight: bold;
    }
`;