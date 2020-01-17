import {
    CLICK_MINE,
    CLICK_SQUARE,
    FLAG_SQUARE,
    SET_BOARD_SIZE,
    SET_MINES,
} from './actionTypes';

type Board = {
    boardSize: string;
    numSquares: number;
    numMines: number;
    colSize: number;
    rowSize: number;
} | undefined;

const clickMine = (index: number) => ({
    type: CLICK_MINE,
    payload: { index },
});

const clickSquare = (index: number | number[]) => ({
    type: CLICK_SQUARE,
    payload: { index },
});

const flagSquare = (index: number) => ({
    type: FLAG_SQUARE,
    payload: { index },
});

const setMines = (mines: number[]) => ({
    type: SET_MINES,
    payload: { mines },
});

const setBoardSize = (board: Board) => ({
    type: SET_BOARD_SIZE,
    payload: { board },
});

const actions = {
    clickMine,
    clickSquare,
    flagSquare,
    setMines,
    setBoardSize,
};

export default actions;
