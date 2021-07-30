import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Link } from "react-router-dom";
import Slider from './Slider';
import EachBeer from "./EachBeer";


const BeerList = () =>{
    /*
    const beerType = [
        {name: "전체"},
        {name: "필스너"},
        {name: "페일에일"},
        {name: "IPA"},
        {name: "둔켈"},
        {name: "스카우트"},
        {name: "복"},
    ]
     console.log(beerType[0]["name"]);
*/
    const beers = [
    {
        category: 'lager',
        name: '곰표 밀맥주' , 
        eng_name: 'Gompyo Wheat Beer',
        //hash_tag: ['달달', '과일향', '상큼함']},
        hash_tag: '달달'},
    {
        category: 'lager',
        name: 'Y끼리 IPA', 
        eng_name: 'IPA with Y',
        hash_tag: '달달'},
    {
        name: '곰표 밀맥주' , 
        eng_name: 'Gompyo Wheat Beer',
        //hash_tag: ['달달', '과일향', '상큼함']},
        hash_tag: '달달'},
    {
        name: 'Y끼리 IPA', 
        eng_name: 'IPA with Y',
        hash_tag: '달달'},
    {
        name: '곰표 밀맥주' , 
        eng_name: 'Gompyo Wheat Beer',
        //hash_tag: ['달달', '과일향', '상큼함']},
        hash_tag: '달달'},
    {
        name: 'Y끼리 IPA', 
        eng_name: 'IPA with Y',
        hash_tag: '달달'},
    {
        name: '곰표 밀맥주' , 
        eng_name: 'Gompyo Wheat Beer',
        //hash_tag: ['달달', '과일향', '상큼함']},
        hash_tag: '달달'},
    {
        name: 'Y끼리 IPA', 
        eng_name: 'IPA with Y',
        hash_tag: '달달'},     
/*    {
        name: '아잉거 셀러브레이터 도펠 보크', 
        eng_name: 'Ayinger Celebrator Doppelbock',
        hash_tag: '달달'}
    , 
*/
    ];
   


    return(
        <React.Fragment>
            <Container>
                <Grid>
                    <TopNav>
                    {/*
                        <li><Link to="/beer/list">all</Link></li>
                        <li><Link to="/beer/list/pilsner">pilsner  </Link></li>
                        <li><Link to="/beer/list/paleale">paleale </Link></li>
                        <li><Link to="/beer/list/ipa">ipa </Link></li>
                        <li><Link to="/beer/list/weizen">weizen </Link></li>
                        <li><Link to="/beer/list/dunkel">dunkel </Link></li>
                        <li><Link to="/beer/list/stout">stout </Link></li>
                        <li><Link to="/beer/list/bock">bock </Link></li>
                    */}

                    <Slider                
                        dots={true}
                        show={3.2}
                        scroll={3}
                        autoplay={false}
                        autoplaySpeed={100000}
                        arrows={false}
                        items={[
                            "전체",
                            "아메리칸 라거",
                            "필스너",
                            "페일에일",
                            "복",
                            "스카우트",
                            "바우젠",
                            "IPA",
                            "둔켈" 
                        ]}
                        
                    />
                    </TopNav>

                    <Search>
                        <input placeholder="검색어를 입력하세요."/>
                    </Search>

                    <List>
                        {beers.length > 0 ? beers.map((item, idx) => (
                            <EachBeer key={idx} {...item} 
                            _onClick={() =>
                                history.push("/beer/detail")
                            }
                            />
                        )):""}
                    </List>
                </Grid>
    
{/*
                    {beerType.length>0? beerType.map((item, idx)=>{
                        <BeerTypeName key={idx}
                            _onClick={() =>
                                history.push(`/beers/list/${item.name}`)
                            }
                        >{item.name}</BeerTypeName>
                        
                    }): ""}
*/}
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
    padding-top: 60px;
    text-align: center;
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
    input{
        width: 312px;
        border:none;
        margin: 10px 24px;
        padding: 7px 24px;
        background: #F6F6F6;
        border-radius: 18px;
    }
`
const List = styled.div`
    width: 320px;
    margin: 0 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

