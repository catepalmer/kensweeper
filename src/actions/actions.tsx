import actionTypes from './actionTypes';

const clickMine = (index: number) => ({
    type: actionTypes.CLICK_MINE,
    payload: { index }
});

const clickSquare = (index: number) => ({
    type: actionTypes.CLICK_SQUARE,
    payload: { index }
})

const flagSquare = (index: number) => ({
    type: actionTypes.FLAG_SQUARE,
    payload: { index }
})

const setMines = (mines: number[]) => ({
    type: actionTypes.SET_MINES,
    payload: { mines }
})

const actions = {
    clickMine,
    clickSquare,
    flagSquare,
    setMines
}

export default actions;
