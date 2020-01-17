import React from 'react';
import styled from 'styled-components';
import '../sass/styles.scss';

const StyledHeader = styled.div`
    border-color: hsla(0, 0%, 0%, 0.2);
    border-style: solid;
    border-width: 2px;
    cursor: default;
    font-size: 4vh;
    font-weight: bold;
    line-height: 10vh;
    text-align: center;
    text-transform: uppercase;
`;

const Header = () => {
    return <StyledHeader />;
};

export default Header;
