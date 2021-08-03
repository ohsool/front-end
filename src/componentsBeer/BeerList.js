import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import Slider from './Slider';
import EachBeer from "./EachBeer";
import { getCategory } from "../redux/async/category";
import { getAllBeer } from "../redux/async/beer";
import { userInfo } from "../redux/async/user"


const BeerList = () =>{
    const dispatch = useDispatch();
    const beers = useSelector(state => state.beer.beerList.beers);
    const items = useSelector(state => state.category.categoryList.beerCategories);
    
    useEffect(() => {
        dispatch(getAllBeer());
        dispatch(getCategory());
        dispatch(userInfo());
    }, []);
    const [input, setInput] = useState();
    
    const onChange = (e) =>{
        setInput(e.target.value);
    }

    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            //dispatch(searchReview(input));
            setInput("");
            console.log("입력된: ",input);
        }


    }


    return(
        <React.Fragment>
            <Container>
                <Grid>
                    <TopNav>
                    <Slider items={items}/>
                    </TopNav>
                    <Search>
                        <input 
                            onChange={onChange}
                            onKeyPress={EnterSubmit}
                            placeholder="검색어를 입력하세요."
                        >
                        </input>
                    </Search>
                    <List>
                        {beers?.length > 0 ? beers.map((item, idx) => (
                            <EachBeer key={idx} item={item} 
                            />
                        )):""}
                    </List>
                </Grid>
            </Container>
        </React.Fragment>
    )


}
export default BeerList;


const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
`
const TopNav = styled.div`
    margin-top: 60px;
    color: #483834;
    ul {
        display: flex;
        list-style:none;
        li {
            font-weight: 500;
            font-size: 14px;
        }
    }

`

const Search = styled.div`
    width: 360px;
    & > input{
        width: 292px;
        height: 30px;
        border:none;
        margin: 10px 24px;
        background: #F6F6F6;
        border-radius: 18px;
        outline: none;
        padding-left: 20px;
        ::placeholder,
        ::-webkit-input-placeholder {
            position: absolute;
            color: #888888;
            margin-top: 7px
        }
    }
`
const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

