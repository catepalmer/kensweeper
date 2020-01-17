import {
    CLICK_MINE,
    CLICK_SQUARE,
    FLAG_SQUARE,
    SET_MINES,
    SET_BOARD_SIZE,
} from '../actions/actionTypes';
import setInitialFlaggedSquares from '../utilities/setInitialFlaggedSquares';

export type Action = {
    type: string;
    payload: {
        index?: number | undefined;
        mines?: number[];
        boardSize?: string;
    };
};

const initialState = {
    losingSquare: null,
    mines: [],
    moves: [],
    flaggedSquares: setInitialFlaggedSquares(81),
    boardSize: 'small',
};

export const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CLICK_MINE: {
            return {
                ...state,
                losingSquare: action.payload.index,
                moves: [
                    ...state.moves.filter(
                        (move, i) => state.moves.indexOf(move) === i
                    ),
                    action.payload.index,
                ],
            };
        }
        case CLICK_SQUARE: {
            if (typeof action.payload.index === 'number') {
                return {
                    ...state,
                    moves: [
                        ...state.moves.filter(
                            (move, i) => state.moves.indexOf(move) === i
                        ),
                        action.payload.index,
                    ],
                };
            } else if (typeof action.payload.index === 'object') {
                return {
                    ...state,
                    moves: [
                        ...state.moves.filter(
                            (move, i) => state.moves.indexOf(move) === i
                        ),
                        action.payload.index,
                    ],
                };
            }
        }
        case FLAG_SQUARE: {
            return {
                ...state,
                flaggedSquares: state.flaggedSquares.map((bool, i) => {
                    return i === action.payload.index ? !bool : bool;
                }),
            };
        }
        case SET_MINES: {
            return {
                ...state,
                mines: action.payload.mines,
            };
        }
        case SET_BOARD_SIZE: {
            return {
                ...state,
                boardSize: action.payload.boardSize,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export type AppState = ReturnType<typeof reducer>;
