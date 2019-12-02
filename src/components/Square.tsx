import React from 'react';
import styled from 'styled-components';
import {
    useDispatch,
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import CLICK_MINE from '../actions/actionTypes';
import CLICK_SQUARE from '../actions/actionTypes';
import FLAG_SQUARE from '../actions/actionTypes';

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

const Square = ({index, isMine}: Props) => {
    const dispatch = useDispatch();
  return (
    <StyledSquare onClick={() => dispatch(isMine ? { type: CLICK_MINE, payload: index } : { type: CLICK_SQUARE, payload: index })} onContextMenu={() => dispatch({ type: FLAG_SQUARE, payload: index })}>
        <StyledImage />
    </StyledSquare>
  );
}

export default Square;
