import React from 'react';
import {
    useDispatch,
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../reducers/index';
import { smallBoard, medBoard, largeBoard } from '../constants';
import actions from '../actions/actions';
import '../sass/styles.scss';

const BoardSizeSelect = () => {
    const dispatch = useDispatch();
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const boardSize = useSelector(state => state.board.boardSize);
    const setBoardSize = (boardSize: string) => {
        const boardSizes = [smallBoard, medBoard, largeBoard];
        const board = boardSizes.find(boardType => {
            return boardType.boardSize === boardSize;
        });
        if (board) dispatch(actions.setBoardSize(board));
    };
    return (
        <select onChange={e => setBoardSize(e.target.value)} value={boardSize}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
    );
};

export default BoardSizeSelect;
