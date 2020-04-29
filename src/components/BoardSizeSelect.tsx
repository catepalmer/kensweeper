import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { smallBoard, medBoard, largeBoard } from '../constants';
import actions from '../actions/actions';
import setMines from '../utilities/setMines';
import '../sass/styles.scss';

const BoardSizeSelect = () => {
	const dispatch = useDispatch();
	const [ boardSize, setBoardSize ] = useState('small');

	const handleClick = () => {
		const boardSizes = [ smallBoard, medBoard, largeBoard ];
		const board = boardSizes.find((boardType) => {
			return boardType.boardSize === boardSize;
		});
		if (board) {
			const mines = setMines(board);
			dispatch(actions.setBoardSize(board));
			dispatch(actions.setMines(mines));
			dispatch(actions.setTime(0));
			dispatch(actions.setInitialTime(undefined));
			dispatch(actions.setGameInProgress(false));
		}
	};

	return (
		<Fragment>
			<select onChange={(e) => setBoardSize(e.target.value)} value={boardSize}>
				<option value="small">Small</option>
				<option value="medium">Medium</option>
				<option value="large">Large</option>
			</select>
			<button onClick={handleClick}>New Game</button>
		</Fragment>
	);
};

export default BoardSizeSelect;
