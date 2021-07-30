import React from 'react';
import { Route } from 'react-router-dom';
import Header from "../Header";

import BeerList from '../componentsBeer/BeerList';
import BeerDetail from '../componentsBeer/BeerDetail';

const Beer = () => {
    return (
        <>  
            <Header/>
            <Route path="/beer/list/" exact component={BeerList}/>
            <Route path="/beer/detail" component={BeerDetail}/>
        </>
    )

}

export default Beer;
