import {
    CLICK_MINE,
    CLICK_SQUARE,
    FLAG_SQUARE,
    SET_MINES,
} from '../actions/actionTypes';
import setInitialFlaggedSquares from '../utilities/setInitialFlaggedSquares';

export type Action = {
    type: string;
    payload: {
        index?: number | undefined;
        mines?: number[];
    };
};

const initialState = {
    losingSquare: null,
    mines: [],
    moves: [],
    flaggedSquares: setInitialFlaggedSquares(81),
};

export const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CLICK_MINE: {
            return {
                ...state,
                losingSquare: action.payload.index,
                moves: [...state.moves, action.payload.index],
            };
        }
        case CLICK_SQUARE: {
            return {
                ...state,
                moves: [...state.moves, action.payload.index],
            };
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
    }
};

export type AppState = ReturnType<typeof reducer>;
