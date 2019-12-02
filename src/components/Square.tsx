import React from 'react';
import styled from 'styled-components';

type Props = {
    index: number;
    isMine: boolean;
}

const StyledImage = styled.img`
  height: 5vh;
  width: 5vh;
  margin: auto;
  margin-top: 0.5vh;
  border: none;
`

const StyledSquare = styled.div`
  border-color: hsla(0, 0%, 0%, 0.2);
  border-style: solid;
  border-width: 2px;
  cursor: default;
  font-size: 4vh;
  font-weight: bold;
  line-height: 7vh;
  text-align: center;
  text-transform: uppercase;
`

const handleClick = () => {
    
}

const Square = ({index, isMine}: Props) => {
  return (
    <StyledSquare onClick={handleClick}>
        <StyledImage />
    </StyledSquare>
  );
}

export default Square;
