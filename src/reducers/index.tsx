import {
    CLICK_MINE,
    CLICK_SQUARE,
    FLAG_SQUARE,
    SET_MINES,
} from '../actions/actionTypes';
import setInitialFlaggedSquares from '../utilities/setInitialFlaggedSquares';

type Action = {
    type: string;
    payload: {
        index?: number;
        mines?: number[];
    };
};

const initialState = {
    mines: [],
    moves: [],
    flaggedSquares: setInitialFlaggedSquares(81),
};

export const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CLICK_MINE: {
            console.log(`in action.CLICK_MINE`);
            return {
                ...state,
                losingSquare: action.payload.index,
            };
        }
        case CLICK_SQUARE: {
            console.log(`in action.CLICK_SQUARE`);
            return {
                ...state,
                moves: [...state.moves, action.payload.index],
            };
        }
        case FLAG_SQUARE: {
            console.log(`in action.FLAG_SQUARE`);
            return {
                ...state,
                flaggedSquares: state.flaggedSquares.map((bool, i) => {
                    return i === action.payload.index ? !bool : bool;
                }),
            };
        }
        case SET_MINES: {
            console.log(`in action.SET_MINES`);
            return {
                ...state,
                mines: action.payload.mines,
            };
        }
    }
};

export type AppState = ReturnType<typeof reducer>;
