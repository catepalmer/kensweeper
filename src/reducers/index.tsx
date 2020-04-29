import {
	CLICK_MINE,
	CLICK_SQUARE,
	FLAG_SQUARE,
	SET_MINES,
	SET_BOARD_SIZE,
	SET_INITIAL_TIME,
	SET_TIME,
	SET_GAME_IN_PROGRESS
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
		initialTime?: number | undefined;
		time?: number;
		isGameInProgress: boolean;
	};
};

const initialState = {
	losingSquare: null,
	mines: [],
	moves: [],
	flaggedSquares: setFlaggedSquares(64),
	board: smallBoard,
	initialTime: undefined,
	time: 0,
	isGameInProgress: false
};

export const reducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case CLICK_MINE: {
			return {
				...state,
				losingSquare: action.payload.index,
				moves: [
					...state.moves.filter((move, i) => state.moves.indexOf(move) === i),
					action.payload.index
				].sort((a, b) => {
					if (a && b) return a - b;
					else return 0;
				})
			};
		}
		case CLICK_SQUARE: {
			return {
				...state,
				moves: [
					...state.moves.filter((move, i) => state.moves.indexOf(move) === i),
					action.payload.index
				].sort((a, b) => {
					if (a && b) return a - b;
					else return 0;
				})
			};
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
					: state.flaggedSquares,
				time: 0
			};
		}
		case SET_INITIAL_TIME: {
			return {
				...state,
				initialTime:
					action.payload.initialTime === undefined
						? action.payload.initialTime
						: state.initialTime ? state.initialTime : action.payload.initialTime
			};
		}
		case SET_TIME: {
			return {
				...state,
				time: action.payload.time
			};
		}
		case SET_GAME_IN_PROGRESS: {
			return {
				...state,
				isGameInProgress: action.payload.isGameInProgress
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
