import React from 'react';
import styled from 'styled-components';

import UserLogo from '../../assets/User.png'

const ContentTexto = styled.div `
    
`

const ContentText = () => {
    return (
        <ContentTexto>
            <h1>Conteudo</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde, eius quia quos dignissimos deleniti, illo quae necessitatibus beatae eaque, laborum delectus iusto recusandae! Consequatur soluta reiciendis illum ex animi!</p>
            <br />
            <img src={UserLogo} />
            <br />
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas blanditiis delectus voluptatibus dolor quisquam recusandae quidem. Non nam perferendis officiis aliquid? Nisi eveniet voluptates maiores exercitationem officiis incidunt tempora necessitatibus!</p>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi unde nobis libero tempora accusamus iste veritatis odio quis laudantium soluta corporis doloremque quaerat perferendis, labore ea voluptatem officiis, laboriosam temporibus.</p>
        </ContentTexto>
    );
}

export default ContentText;
