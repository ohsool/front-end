import React, {PureComponent} from "react";
import styled from "styled-components";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const TasteGraph = (props) => {
    const data = [
        { subject: '쓴맛', A: 0, B: 1, fullMark: 1 },
        { subject: '청량감', A: 5, B: 2, fullMark: 3 },
        { subject: '향', A: 3, B: 3, fullMark: 4 },
        { subject: '단맛', A: 2, B: 5, fullMark: 5 },
        { subject: '고소한맛', A: 4, B: 2, fullMark: 3 },
        { subject: '도수', A: 5, B: 4, fullMark: 2 },
      ];
    return(
        <React.Fragment>
            <RadarChart cx={130} cy={135} outerRadius={70} width={265} height={265} data={data}>
                <PolarGrid/>
                <PolarAngleAxis style={{fontSize: "14px", color: "white"}} dataKey="subject" />
                <PolarRadiusAxis  orient="middle" angle={67.5}/>
                <Radar strokeWidth={2} name="standard" dataKey="A" stroke="gray" fill="gray" fillOpacity={0.4} />
            </RadarChart>

        </React.Fragment>
    )
}

export default TasteGraph;