import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSearchWord } from "../redux/async/beer";
import { getSearchList } from "../redux/reducer/beerSlice";

import remove from "../share/image/remove.png";

const Search = (props) => {
    const { setSearch_Beer,beers,setIs_Search } = props;

    const [word, setWord] = useState(); //실시간으로 입력하는 단어담김
    const words = useSelector(getSearchList); //["버드와이저","오번"]
    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };
    const dispatch = useDispatch();

    const onChange = (e) =>{

        if(e.target.value == ''){//검색어 지웠을 때 검색목록 사라지도록 
            setWord(null) 
        }else{
            setWord(e.target.value);
        }
    
    }

    const searchWord = () =>{
        dispatch(getSearchWord(word));
        
    }

    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            findBeer();
        }
    }

    const findBeer = ()=>{
        const check_eng = /[a-zA-Z]/; // 영어체크
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
        setSearch_Beer([]);

        if(check_eng.test(word)){
            //영어로 검색
            words.map((w)=>{
                setSearch_Beer(search_beer => [...search_beer, beers?.filter((p) => p.name_korean.includes(w))[0]]);
                setIs_Search(true);
            })

        }else if(check_kor.test(word)){
            //한국어로 검색
            words.map((w)=>{
                setSearch_Beer(search_beer => [...search_beer, beers?.filter((p) => p.name_korean.includes(w))[0]]);
                setIs_Search(true);   
            })

        }else{
            window.alert("잘못 입력 하셨습니다.");
        }
    }
    const findBeerbyClick = (name)=>{
        const check_eng = /[a-zA-Z]/; // 영어체크
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
        setSearch_Beer([]);
        if(check_eng.test(word)){
            //영어로 검색
            setSearch_Beer(search_beer => [...search_beer, beers?.filter((p) => p.name_korean.includes(name))[0]]);
        }else if(check_kor.test(word)){
            //한국어로 검색
            setSearch_Beer(search_beer => [...search_beer, beers?.filter((p) => p.name_korean.includes(name))[0]]);
        }
        setIs_Search(true); 
        
    }


    
    return (
        <React.Fragment>
            <SearchInput>
                <input 
                    onChange={onChange}
                    onKeyUp={searchWord}
                    onKeyPress={EnterSubmit}
                    placeholder="검색어를 입력하세요."
                    onClick={()=>{
                        openModal();
                    }}
                ></input>
                
            </SearchInput>

                     
            { words.length !== 0 ?
                <SearchModal>
                    <CloseIcon
                        style={{backgroundImage: `url(${remove})`}}
                        onClick={()=>{closeModal()}}>
                    </CloseIcon>
                    <div style={{paddingLeft: "40px"}}>
                    {words?.length > 0 ? words.map((item, idx) => {
                        return (
                            <p
                               key={idx} onClick={()=>{
                               findBeerbyClick(item);
                            }}>{item}
                            </p> 
                        )       
                    }):""}            
                    </div>
                </SearchModal>
                : null }



        </React.Fragment>
    )



}
export default Search;

const SearchInput = styled.div`
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

    }
`

const SearchModal = styled.div`
    position: absolute;
    margin : 0 auto;    
    width: 360px;
    background-color: #FFFFFF;
    
    //글자 라인 수 제한하기
    overflow: hidden;
    display: -webkit-box;
    min-height: 70px;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;

`

const CloseIcon = styled.div`
    position: absolute;
    right: 24px;
    top: 22px;
    width: 16px;
    height: 16px;
    border: 1px solid black;
`;
