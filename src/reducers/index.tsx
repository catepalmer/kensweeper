import {
	CLICK_MINE,
	CLICK_SQUARE,
	FLAG_SQUARE,
	SET_MINES,
	SET_BOARD_SIZE,
	SET_INITIAL_TIME
} from '../actions/actionTypes';
import setFlaggedSquares from '../utilities/setFlaggedSquares';
import { smallBoard } from '../constants';

export type Action = {
	type: string;
	payload: {
		index?: number | undefined;
		mines?: number[];
		board: {
			boardSize: string;
			numSquares: number;
			numMines: number;
			colSize: number;
			rowSize: number;
		};
		initialTime?: number;
	};
};

const initialState = {
	losingSquare: null,
	mines: [],
	moves: [],
	flaggedSquares: setFlaggedSquares(64),
	board: smallBoard,
	initialTime: undefined
};

export const reducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case CLICK_MINE: {
			return {
				...state,
				losingSquare: action.payload.index,
				moves: [ ...state.moves.filter((move, i) => state.moves.indexOf(move) === i), action.payload.index ]
			};
		}
		case CLICK_SQUARE: {
			if (typeof action.payload.index === 'number') {
				return {
					...state,
					moves: [ ...state.moves.filter((move, i) => state.moves.indexOf(move) === i), action.payload.index ]
				};
			} else if (typeof action.payload.index === 'object') {
				return {
					...state,
					moves: [ ...state.moves.filter((move, i) => state.moves.indexOf(move) === i), action.payload.index ]
				};
			}
		}
		case FLAG_SQUARE: {
			return {
				...state,
				flaggedSquares: state.flaggedSquares.map((bool, i) => {
					return i === action.payload.index ? !bool : bool;
				})
			};
		}
		case SET_MINES: {
			return {
				...state,
				mines: action.payload.mines
			};
		}
		case SET_BOARD_SIZE: {
			return {
				...state,
				losingSquare: null,
				moves: [],
				board: action.payload.board,
				flaggedSquares: action.payload.board.numSquares
					? setFlaggedSquares(action.payload.board.numSquares)
					: state.flaggedSquares
			};
		}
		case SET_INITIAL_TIME: {
			return {
				...state,
				initialTime: state.initialTime ? state.initialTime : action.payload.initialTime
			};
		}
		default: {
			return {
				...state
			};
		}
	}
};

export type AppState = ReturnType<typeof reducer>;
