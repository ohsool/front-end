import React,{useState} from "react";
import styled from "styled-components";
import edit from "../share/image/edit.png";
import remove from "../share/image/remove.png";
import {history} from "../redux/configureStore";
import {useDispatch} from "react-redux";
import {ReviewWriteModal} from "../componentsBeerDetail/BeerDetailIndex";
import {deleteReview} from "../redux/async/review";
import { deleteReviewDogam } from "../redux/async/mybeer";


const WritedReview = ({item}) =>   {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    return(
        <React.Fragment>
            <WritedBeerInfo 
                onClick={()=>{
                    history.push(`/review/${item._id}`, item)
                }}
            >
                <BeerImage>
                    <img src={item?.beerId?.image}></img>
                </BeerImage>
                <BeerTextWrap>
                    <GridHorizon>
                        <NicknameText>
                            {item?.userId?.nickname}
                        </NicknameText>
                        <Div>
                            <EditButton 
                                style={{backgroundImage: `url(${edit})`}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openModal();
                            }}></EditButton>
                            
                            <DeleteButton
                                style={{backgroundImage: `url(${remove})`}} 
                                onClick = {(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if(window.confirm("정말로 삭제하시나요?")){
                                    dispatch(deleteReview(item._id));
                                    dispatch(deleteReviewDogam(item._id));
                                    return;
                                }
                            }}></DeleteButton>
                        </Div>
                    </GridHorizon>
                    <span>{item?.review}</span>
                </BeerTextWrap>
            </WritedBeerInfo>

            <ReviewWriteModal
                open={modalOpen}
                close={closeModal}
                //beerOne={item}
                item={item}
                is_edit={true}
                mybeerId={item._id}//수정시 해당 id로 리뷰 접근
            ></ReviewWriteModal> 
        </React.Fragment>
    )
}

export default WritedReview;

const WritedBeerInfo = styled.div`
    width: 312px;
    height: 100px;
    display: flex;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin: 5px auto;
    cursor: pointer;
`;

const BeerImage = styled.div`
    margin: 10px;
    border-radius: 10px;
    width: 80px;
    height: 80px;
    background-color: #FFFFFF;
    & > img{
        width: 80px;
        height: 80px;
    }
`;

const BeerTextWrap = styled.div`
    margin: 14px 0 0 6px;
    width: 194px;
    & > span{
        font-size: 12px;
        font-weight: 300;
        font-height: 46px;
    }
`;

const GridHorizon = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;

`
const NicknameText = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    font-height: 20px;
`
const Div = styled.div`
    display: flex;
    padding: 0 2px;
    align-items: center
`

const EditButton =styled.div`
    margin: 2px;
    width: 16px;
    height: 16px;
    float: left;
    cursor: pointer;
`

const DeleteButton =styled.div`
    margin: 2px;
    width: 16px;
    height: 16px;
    cursor: pointer;
`