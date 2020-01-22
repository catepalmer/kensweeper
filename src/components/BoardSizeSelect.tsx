import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { smallBoard, medBoard, largeBoard } from '../constants';
import actions from '../actions/actions';
import '../sass/styles.scss';

const BoardSizeSelect = () => {
    const dispatch = useDispatch();
    const [boardSize, setBoardSize] = useState('');
    
    const handleClick = () => {
        const boardSizes = [smallBoard, medBoard, largeBoard];
        const board = boardSizes.find(boardType => {
            return boardType.boardSize === boardSize;
        });
        if (board) dispatch(actions.setBoardSize(board));
    };

    return (
        <>
            <select
                onChange={e => setBoardSize(e.target.value)}
                value={boardSize}
            >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <button onClick={handleClick}>New Game</button>
        </>
    );
};

export default BoardSizeSelect;
