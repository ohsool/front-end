import React, { useEffect } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getBeerCategoryList} from "../redux/async/beer";
import { beerCategory } from "../redux/reducer/beerSlice";
import EachBeer from "./EachBeer";

const BeerListCategory = ({get_category_id}) => {
    const category_beers = useSelector(beerCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeerCategoryList(get_category_id));
    }, [get_category_id]);

    return(
        <React.Fragment>
            <List>
            {category_beers?.map((item, idx) => (
                <EachBeer key={idx} item={item} />
            ))}
            </List>
        </React.Fragment>
    )
}

export default React.memo(BeerListCategory);

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;