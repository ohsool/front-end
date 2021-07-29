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
            {/*
            <SubText>{hash_tag.map((item, idx)=>{
                let label = item.join("#")
                return `${<span>{label}</span>}`;
            })}</SubText>
        */}
            <HashTagText>#{hash_tag}</HashTagText>
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
    padding: 0 8px;
    span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-align:left;
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

`
const EngNameText = styled.span`
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
`
const HashTagText = styled.span`
    padding: 1px 6px;
    border-radius: 50px;
    border: 1px soild #212121;
    background-color:transparent;
    font-size: 10px;
    line-height: 14px;
    text-align:left;

`