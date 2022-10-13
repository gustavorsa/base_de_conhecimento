import React from "react";
import styled from "styled-components";

const BodyLoader = styled.div `
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    transform: scale(5);
`

const Cloader = styled.div `
    animation: is-rotating 1s infinite;
    border: 6px solid #e5e5e5;
    border-radius: 50%;
    border-top-color: #2e4afc;
    height: 50px;
    width: 50px;

    @keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}
`

export const Loader = () => {
    return (
        <BodyLoader>
            <Cloader />
        </BodyLoader>
    )
}