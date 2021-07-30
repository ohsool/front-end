//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import  HeartButton  from "./HeartButton";


const EachBeer=(props)=> {
    const [toggle, setToggle] = useState(false);
    
    const { _onClick ,name, eng_name, hash_tag} = props; 
    return (
        <>
        <Container onClick={_onClick}>
            <Img/>
            <NameText>{name}</NameText>
            <HeartButton
                _onClick={(e) => {
                toggle ? setToggle(false) : setToggle(true);
                e.preventDefault();
                e.stopPropagation();              
            }}
            is_like={toggle}
          />
            <EngNameText>{eng_name}</EngNameText>
            
            <TasteTag>#{hash_tag}</TasteTag>
        </Container>   
        </>
    )
}

export default EachBeer

EachBeer.detaultProps = {
    _onClick: ()=>{}
}


const Container = styled.div`
    margin: 10px;
    text-align:left;
    span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin: 0 6px;
          
    }
`

const Img = styled.div`
    width: 148px;
    height: 148px;
    border: none;
    border-radius: 10px;
    background-color: #F6F6F6;

`

const NameText = styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    display: inline;

`
const EngNameText = styled.span`
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
`
const TasteTag = styled.div`
    display: inline-block;
    width: 36px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    text-align:center;
    line-height: 14px;
    color: #555;
`;