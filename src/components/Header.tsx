import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    grid-column-start: 1;
    grid-column-end: 10;
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

    return (
        <StyledHeader />
    );
};

export default Header;
