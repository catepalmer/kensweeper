import React from 'react';
import { useDispatch } from 'react-redux';
import { smallBoard, medBoard, largeBoard } from '../constants';
import actions from '../actions/actions';
import '../sass/styles.scss';

const BoardSizeSelect = () => {
    const dispatch = useDispatch();
    const setBoardSize = (boardSize: string) => {
        const boardSizes = [smallBoard, medBoard, largeBoard];
        const board = boardSizes.find(boardType => {
            return boardType.boardSize === boardSize;
        });
        dispatch(actions.setBoardSize(board));
    };
    return (
        <select onChange={e => setBoardSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
    );
};

export default BoardSizeSelect;
