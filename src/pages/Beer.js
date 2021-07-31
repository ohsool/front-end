import React from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import Header from "../Header";

import BeerList from '../componentsBeer/BeerList';
import BeerDetail from '../componentsBeer/BeerDetail';
import ReviewList from '../componentsBeer/ReviewList';

const Beer = () => {
    return (
        <>  
            <Header/>
            <Route path="/beer/list/" exact component={BeerList}/>
            <Route path="/beer/detail/" exact component={BeerDetail}/>
            <Route path="/beer/detail/review" exact component={ReviewList}/>
        </>
    )

}

export default Beer;
