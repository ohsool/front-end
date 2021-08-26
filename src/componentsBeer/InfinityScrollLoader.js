import React from "react";
import styled from "styled-components";
import "../share/style/scrollLoader.css"

const InfinityScrollLoader = (props) => {
    return(
        <React.Fragment>
            <div id="fountainG">
                <div id="fountainG_1" class="fountainG"></div>
                <div id="fountainG_2" class="fountainG"></div>
                <div id="fountainG_3" class="fountainG"></div>
                <div id="fountainG_4" class="fountainG"></div>
                <div id="fountainG_5" class="fountainG"></div>
                <div id="fountainG_6" class="fountainG"></div>
                <div id="fountainG_7" class="fountainG"></div>
                <div id="fountainG_8" class="fountainG"></div>
            </div>
        </React.Fragment>
    )
}

export default InfinityScrollLoader;