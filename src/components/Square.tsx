import React, { CSSProperties, MouseEvent, ReactElement } from 'react';
import '../sass/styles.scss';
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
import setFlaggedSquares from '../utilities/setFlaggedSquares';
import actions from '../actions/actions';

import flag from '../images/flag.png';
import ken from '../images/ken.jpg';
import mine from '../images/mine.png';

type SquareProps = {
    index: number;
    boardSize: string;
};

const Square = ({ index, boardSize }: SquareProps) => {
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const mines = state ? state.mines : [];
    const moves = state ? state.moves : [];
    const losingSquare = state ? state.losingSquare : '';
    const flaggedSquares = state ? state.flaggedSquares : setFlaggedSquares(64);
    const isMine = checkIfMine(index, mines);
    const isLosingSquare = losingSquare === index;
    const isFlagged = checkIfFlagged(index, flaggedSquares);
    const isPlayed = checkIfPlayed(index, moves);
    const minesTouching = getMinesTouching(index, mines, boardSize);
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
        <div
            onClick={handleClick}
            onContextMenu={(e: MouseEvent) => handleRightClick(e)}
            className={`square 
                ${
                    isLosingSquare
                        ? 'square--losing'
                        : minesTouching === 1
                        ? 'u-color-magenta'
                        : minesTouching === 2
                        ? 'u-color-purple'
                        : minesTouching === 3
                        ? 'u-color-blue-dark'
                        : minesTouching === 4
                        ? 'u-color-green'
                        : minesTouching === 5
                        ? 'u-color-teal-dark'
                        : minesTouching === 6
                        ? 'u-color-teal-light'
                        : minesTouching === 7
                        ? 'u-color-pink-hot'
                        : minesTouching === 8
                        ? 'u-color-blue-light'
                        : ''
                }`}
        >
            {displayMinesTouching ? (
                minesTouching
            ) : displayImage ? (
                <img src={imageSrc} className="image--small" />
            ) : (
                ''
            )}
        </div>
    );
};

export default Square;
