import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MapImage = (props) => {
    const options = {
        center: new window.kakao.maps.LatLng(37.44940, 126.70097),
        level: 3
    };
    const container = useRef(null);

    useEffect(() => {
        new window.kakao.maps.Map(container.current, options);
        return() => {};
    }, []);
    return(
        <React.Fragment>
            <div 
                className= "map"
                ref={container}
                style={{width:"340px", height:"340px"}}></div>
        </React.Fragment>
    )
}

export default MapImage;