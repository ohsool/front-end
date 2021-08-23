import React from 'react';
import { Route } from 'react-router-dom';
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import {BeerList} from '../componentsBeer/BeerIndex';

import {BeerDetail,ReviewList} from '../componentsBeerDetail/BeerDetailIndex';

const Beer = (props) => {

    return (
        <React.Fragment>
            <Header/>
            <ConnectedRouter history={history}>
            <Route path="/beer/list/:beerCategoryId" exact component={BeerList}/>
            <Route path="/beer/detail/:beerId" component={BeerDetail}/>
            <Route path="/beer/review/:beerId" component={ReviewList}/>
            <Route path="/beer/list/search/:word" component={BeerList}/>
            </ConnectedRouter>
            {/*<NavigationBar/>*/}
        </React.Fragment>
    )

}

export default React.memo(Beer);
