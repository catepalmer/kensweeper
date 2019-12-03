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

type SquareProps = {
    index: number;
};

type StyledSquareProps = {
    isLosingSquare: boolean | null;
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
    background-color: ${(props: StyledSquareProps) =>
        props.isLosingSquare ? 'red' : 'white'};
`;

const Square = ({ index }: SquareProps) => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const mines = state ? state.mines : [];
    const isMine = mines && mines.find(mine => mine === index);
    const moves = state ? state.moves : [];
    const losingSquare = state ? state.losingSquare : '';
    const isLosingSquare = losingSquare === index;
    const flaggedSquares = state
        ? state.flaggedSquares
        : setInitialFlaggedSquares(81);
    const isFlagged = flaggedSquares.find((square, i) => i === index);
    const isPlayed = !!moves.find(square => square === index);
    const minesTouching = getMinesTouching(index, mines);
    const displayMinesTouching =
        isPlayed && !isMine && !isFlagged && minesTouching && minesTouching > 0;
    const displayImage =
        ((isPlayed || isFlagged) && minesTouching === 0) ||
        (losingSquare && isMine);
    const imageSrc = isFlagged
        ? flag
        : isMine
        ? mine
        : minesTouching === 0
        ? ken
        : '';

    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault();
        if (!isPlayed) {
            dispatch(actions.flagSquare(index));
        }
    };

    const handleClick = () => {
        dispatch(
            isMine ? actions.clickMine(index) : actions.clickSquare(index)
        );
    };

    return (
        <StyledSquare
            isLosingSquare={isLosingSquare}
            onClick={handleClick}
            onContextMenu={(e: MouseEvent) => handleRightClick(e)}
        >
            {displayMinesTouching ? (
                minesTouching
            ) : displayImage ? (
                <StyledImage src={imageSrc} />
            ) : (
                ''
            )}
        </StyledSquare>
    );
};

export default Square;
