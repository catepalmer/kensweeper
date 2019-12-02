import actionTypes from '../actions/actionTypes';

type Action = {
    type: string,
    payload: {
        index?: number;
        mines?: number[];
    }
}

const initialFlaggedSquares = (numSquares: number) => {
    let squares = [];
    for (let i = 0; i < numSquares; i++) {
      squares.push(false);
    }
    return squares;
};

const initialState = {
    mines: [],
    moves: [],
    flaggedSquares: initialFlaggedSquares(81)
}

export const reducer = (state = initialState, action: Action) => {
    const { index, mines } = action.payload;
    switch (action.type) {
        case actionTypes.CLICK_MINE: {
            return {
                ...state,
                losingSquare: index
            }
        }
        case actionTypes.CLICK_SQUARE: {
            return {
                ...state,
                moves: [...state.moves, index]
            }
        }
        case actionTypes.FLAG_SQUARE: {
            return {
                ...state,
                flaggedSquares: state.flaggedSquares.map((bool, i) => {
                    (i === index) ? !bool : bool;
                })
            }
        }
        case actionTypes.SET_MINES: {
            return {
                ...state,
                mines
            }
        }
    }
}

export type AppState = ReturnType<typeof reducer>;
