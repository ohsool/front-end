import React from 'react';
import { Route } from 'react-router-dom';
import Header from "../Header";

import BeerList from '../componentsBeer/BeerList';
import BeerDetail from '../componentsBeer/BeerDetail';
import ReviewList from '../componentsBeer/ReviewList';

const Beer = (props) => {
    return (
        <>  
            <Header/>
            <Route path="/beer/list/" exact component={BeerList}/>
            <Route path="/beer/detail/" component={BeerDetail}/> {/*:beer_id*/}
            <Route path="/beer/review/" exact component={ReviewList}/>
        </>
    )

}

export default Beer;
