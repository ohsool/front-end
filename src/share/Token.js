import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import { getCookie, setCookie } from "./Cookie";
const Token = (props) => {
    const [socialToken, setSocialToken] = useState("");

    useEffect(() =>{
        setSocialToken(props.match.params.token);
        setCookie("_osid", socialToken);
        history.push("/")
    }, []);
    return(
        <React.Fragment>
            소셜 로그인 진행중입니다...
        </React.Fragment>
    )
}

export default Token;