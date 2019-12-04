import {
    CLICK_MINE,
    CLICK_SQUARE,
    FLAG_SQUARE,
    SET_MINES,
} from './actionTypes';

const clickMine = (index: number) => ({
    type: CLICK_MINE,
    payload: { index },
});

// const clickSquare = (index: number, mines: number[] | undefined) => {
//     const minesTouching = getMinesTouching(index, mines);
//     if (minesTouching === 0) {
//         const squaresTouchingArray = getSquaresTouching(index);
//         squaresTouchingArray.forEach(square => {
//             clickSquare(square, mines);
//         })
//     }
//     return {
//         type: CLICK_SQUARE,
//         payload: { index },  
//     }
// }

const clickSquare = (index: number) => ({
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

const actions = {
    clickMine,
    clickSquare,
    flagSquare,
    setMines,
};

export default actions;
