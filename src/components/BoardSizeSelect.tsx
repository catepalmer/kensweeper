import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { smallBoard, medBoard, largeBoard } from '../constants';
import { AppState } from '../reducers/index';
import actions from '../actions/actions';
import setMines from '../utilities/setMines';
import ken from '../images/ken.jpg';
import kenSad from '../images/ken-sad.png';
import kenHappy from '../images/ken-sunglasses.png';
import '../sass/styles.scss';

const BoardSizeSelect = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const { moves, flaggedSquares, board, losingSquare } = state;
	const isGameWon = moves.length + flaggedSquares.filter((square) => square).length === board.numSquares;
	const isGameLost = losingSquare !== null;

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const boardSizes = [ smallBoard, medBoard, largeBoard ];
		const board = boardSizes.find((boardType) => {
			return boardType.boardSize === e.target.value;
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

	const selectStyle = {
		backgroundImage: `url(${isGameWon ? kenHappy : isGameLost ? kenSad : ken})`,
		backgroundSize: '6vh 6vh',
		color: 'transparent',
		border: 'none',
		outline: '0',
		width: '6vh',
		height: '6vh',
		borderRadius: '0'
	};

	return (
		<select style={selectStyle} onChange={(e) => handleChange(e)} value={board.boardSize}>
			<option value="small">Small</option>
			<option value="medium">Medium</option>
			<option value="large">Large</option>
		</select>
	);
};

export default BoardSizeSelect;
