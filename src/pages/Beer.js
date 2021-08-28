import React, {lazy, Suspense} from 'react';
import styled from "styled-components";
import { Route } from 'react-router-dom';
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Loader from "../share/Loader";

const BeerList = lazy(() => import("../componentsBeer/BeerList"));
const BeerDetail = lazy(() => import("../componentsBeerDetail/BeerDetail"));

const Beer = (props) => {

    return (
        <React.Fragment>
            <Header/>
            <Suspense fallback={<LoaderWrap><Loader/></LoaderWrap>}>
                <ConnectedRouter history={history}>
                <Route path="/beer/list/:beerCategoryId" exact component={BeerList}/>
                <Route path="/beer/detail/:beerId" component={BeerDetail}/>
                <Route path="/beer/list/search/:word" component={BeerList}/>
                </ConnectedRouter>
                </Suspense>
            <NavigationBar props={props}/>
        </React.Fragment>
    )
}

export default React.memo(Beer);

const LoaderWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
`;
