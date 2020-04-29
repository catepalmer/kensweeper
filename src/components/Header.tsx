import React from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import { smallBoard } from '../constants';
import BoardSizeSelect from './BoardSizeSelect';
import MinesCounter from './MinesCounter';
import Timer from './Timer';
import '../sass/styles.scss';

const Header = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const board = state ? state.board : smallBoard;

	return (
		<div
			className={`header ${board.boardSize === 'small'
				? 'header--small'
				: board.boardSize === 'medium' ? 'header--medium' : 'header--large'}`}
		>
			<MinesCounter />
			<BoardSizeSelect />
			<Timer />
		</div>
	);
};

export default Header;
