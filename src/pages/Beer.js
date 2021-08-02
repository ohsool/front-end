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
            <Route path="/beer/detail/:beerId" component={BeerDetail}/>
            <Route path="/beer/review/" component={ReviewList}/>
        </>
    )

}

export default Beer;
