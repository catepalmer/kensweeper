import {
    CLICK_MINE,
    CLICK_SQUARE,
    FLAG_SQUARE,
    SET_BOARD_SIZE,
    SET_MINES,
} from './actionTypes';

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

const setBoardSize = (boardSize: string) => ({
    type: SET_BOARD_SIZE,
    payload: { boardSize },
});

const actions = {
    clickMine,
    clickSquare,
    flagSquare,
    setMines,
    setBoardSize,
};

export default actions;
