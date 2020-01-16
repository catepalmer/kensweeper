import React, { CSSProperties, MouseEvent } from 'react';
import styled from 'styled-components';
import {
    useDispatch,
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../reducers/index';
import checkDisplayImage from '../utilities/checkDisplayImage';
import checkDisplayMinesTouching from '../utilities/checkDisplayMinesTouching';
import checkIfFlagged from '../utilities/checkIfFlagged';
import checkIfMine from '../utilities/checkIfMine';
import checkIfPlayed from '../utilities/checkIfPlayed';
import getMinesTouching from '../utilities/getMinesTouching';
import setInitialFlaggedSquares from '../utilities/setInitialFlaggedSquares';
import actions from '../actions/actions';

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

const purple = `#9600FF`;
const darkBlue = `#4900FF`;
const lightBlue = `#00B8FF`;
const lightTeal = `#00FFF9`;
const darkTeal = `#02C6C9`;
const magenta = `#FF00C0`;
const green = `	#00E788`;
const hotPink = `#FA2681`;

const colours = [
    `#9600FF`,
    `#02C6C9`,
    `#00E788`,
    `#FA2681`,
    `#4900FF`,
    `#FF00C0`,
    `#00B8FF`,
    `#00FFF9`
];

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
    const moves = state ? state.moves : [];
    const losingSquare = state ? state.losingSquare : '';
    const flaggedSquares = state
    ? state.flaggedSquares
    : setInitialFlaggedSquares(81);
    
    const isMine = checkIfMine(index, mines);
    const isLosingSquare = losingSquare === index;
    const isFlagged = checkIfFlagged(index, flaggedSquares);
    const isPlayed = checkIfPlayed(index, moves);
    const minesTouching = getMinesTouching(index, mines);
    const colour = colours.find((hex, i) => i === (minesTouching ? minesTouching - 1 : null)); 
    const colourStyle: CSSProperties = { color: colour ? colour : '' };
    const displayMinesTouching = checkDisplayMinesTouching(
        isPlayed,
        isMine,
        isFlagged,
        minesTouching
    );
    const displayImage = checkDisplayImage(
        isPlayed,
        isMine,
        isFlagged,
        minesTouching,
        losingSquare
    );
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
            style={colourStyle}
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
