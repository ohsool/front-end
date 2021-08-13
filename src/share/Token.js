import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import { getCookie, setCookie } from "./Cookie";
const Token = (props) => {

    useEffect(() =>{
        setCookie("_osid", props.match.params.token);
        history.push("/")
    }, []);
    return(
        <React.Fragment>
            소셜 로그인 진행중입니다...
        </React.Fragment>
    )
}

export default Token;