import {
	CLICK_MINE,
	CLICK_SQUARE,
	FLAG_SQUARE,
	SET_BOARD_SIZE,
	SET_MINES,
	SET_INITIAL_TIME,
	SET_TIME,
	SET_GAME_IN_PROGRESS
} from './actionTypes';

type Board = {
	boardSize: string;
	numSquares: number;
	numMines: number;
	colSize: number;
	rowSize: number;
};

const clickMine = (index: number) => ({
	type: CLICK_MINE,
	payload: { index }
});

const clickSquare = (index: number | number[]) => ({
	type: CLICK_SQUARE,
	payload: { index }
});

const flagSquare = (index: number) => ({
	type: FLAG_SQUARE,
	payload: { index }
});

const setMines = (mines: number[]) => ({
	type: SET_MINES,
	payload: { mines }
});

const setBoardSize = (board: Board) => ({
	type: SET_BOARD_SIZE,
	payload: { board }
});

const setInitialTime = (initialTime: number | undefined) => ({
	type: SET_INITIAL_TIME,
	payload: { initialTime }
});

const setTime = (time: number) => ({
	type: SET_TIME,
	payload: { time }
});

const setGameInProgress = (isGameInProgress: boolean) => ({
	type: SET_GAME_IN_PROGRESS,
	payload: { isGameInProgress }
});

const actions = {
	clickMine,
	clickSquare,
	flagSquare,
	setMines,
	setBoardSize,
	setInitialTime,
	setTime,
	setGameInProgress
};

export default actions;
