import React from 'react';
import styled from 'styled-components'
import FormUser from '../../components/form/FormUserant';
import TableUser from '../../components/table/TableUser';

const Container = styled.div `
    padding: 20px 10px;
`

const User = () => {
    return (
        <>
          <Container>
            <FormUser />
            <TableUser />
          </Container>
        </>
    )
};

export default User;