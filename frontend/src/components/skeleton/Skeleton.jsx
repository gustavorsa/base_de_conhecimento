import { Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.div `
    padding: 10px;
`

const Skeletons = ( ) => {
    return (
        <Nav>
            <Skeleton active avatar paragraph={{ rows: 20 }}/>
        </Nav>
    )
}

export default Skeletons;