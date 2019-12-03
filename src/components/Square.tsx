import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import {
    useDispatch,
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../reducers/index';
import setInitialFlaggedSquares from '../utilities/setInitialFlaggedSquares';
import actions from '../actions/actions';
import getMinesTouching from '../utilities/getMinesTouching';

import flag from '../images/flag.png';
import ken from '../images/ken.jpg';
import mine from '../images/mine.png';

type Props = {
    index: number;
    isMine: boolean;
};

const StyledImage = styled.img`
    height: 6.5vh;
    width: 6.5vh;
    margin: auto;
    border: none;
`;

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
`;

const Square = ({ index, isMine }: Props) => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const mines = state ? state.mines : [];
    const moves = state ? state.moves : [];
    const flaggedSquares = state
        ? state.flaggedSquares
        : setInitialFlaggedSquares(81);
    const isFlagged = flaggedSquares.find((square, i) => i === index);
    const isPlayed = !!moves.find(square => square === index);
    const minesTouching = getMinesTouching(index, mines);
    const displayImage =
        isFlagged || (isPlayed && (isMine || minesTouching === 0));
    const displayMinesTouching =
        isPlayed && !isMine && !isFlagged && minesTouching && minesTouching > 0;
    const imageSrc = isFlagged
        ? flag
        : isMine
        ? mine
        : minesTouching === 0
        ? ken
        : '';

    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(actions.flagSquare(index));
    };

    return (
        <StyledSquare
            onClick={() =>
                dispatch(
                    isMine
                        ? actions.clickMine(index)
                        : actions.clickSquare(index)
                )
            }
            onContextMenu={(e: MouseEvent) => handleRightClick(e)}
        >
            {displayImage ? <StyledImage src={imageSrc} /> : ''}
            {displayMinesTouching ? minesTouching : ''}
        </StyledSquare>
    );
};

export default Square;
