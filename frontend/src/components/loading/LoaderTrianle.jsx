import React from "react";
import styled from "styled-components";

const CenterBody = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`
const Loader = styled.div `

`
const Svg = styled.svg `
    width: 50px;
    height: 50px;
`

const Polygon = styled.polygon `
    stroke: #ffeb3b;
    stroke: #fff;
    stroke-dasharray: 17;
    animation: anm;
`

export const LoaderTrianle = () => {
    return (
        <CenterBody>
            <Loader>
                <Svg>

                </Svg>
                <Polygon>

                </Polygon>
            </Loader>
        </CenterBody>
    )
}