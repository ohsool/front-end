import React from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import Header from "../Header";

import BeerList from '../componentsBeer/BeerList';
import BeerDetail from '../componentsBeer/BeerDetail';

const Beers = () => {
    return (
        <>  
            <Header/>
            <Route path="/beers/list/" exact component={BeerList}/>
            <Route path="/beers/detail" component={BeerDetail}/>
        </>
    )

}

export default Beers;
