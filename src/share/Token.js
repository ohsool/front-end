import { set } from "lodash";
import React, { useEffect } from "react";
import { history } from "../redux/configureStore";
import { setCookie } from "./Cookie";
const Token = (props) => {
    const tokens = props.match.params.tokens;
    const refresh = tokens.split("&")[0];
    const access = tokens.split("&")[1].split("=")[1];
    useEffect(() =>{
        setCookie("_osid", access);
        setCookie("_osidRe", refresh);
        history.push("/")
    }, []);
    return(
        <React.Fragment>
            소셜 로그인 진행중입니다...
        </React.Fragment>
    )
}

export default Token;