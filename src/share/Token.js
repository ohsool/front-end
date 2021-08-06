import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";
const Token = (props) => {
    const [socialToken, setSocialToken] = useState("");
    useEffect(() =>{
        setSocialToken(props.match.params.token);
        sessionStorage.setItem("token", props.match.params.token);
        history.push("/")
    }, []);
    return(
        <React.Fragment>
            소셜 로그인 진행중입니다...
        </React.Fragment>
    )
}

export default Token;