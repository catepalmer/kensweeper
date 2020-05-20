import React from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import { smallBoard } from '../constants';
import MinesCounter from './MinesCounter';
import Timer from './Timer';
import '../sass/styles.scss';
import ken from '../images/ken.jpg';
import kenSad from '../images/ken-sad.png';
import kenHappy from '../images/ken-sunglasses.png';

const Header = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const board = state ? state.board : smallBoard;
	const { moves, flaggedSquares, losingSquare } = state;
	const isGameWon = moves.length + flaggedSquares.filter((square) => square).length === board.numSquares;
	const isGameLost = losingSquare !== null;

	const selectStyle = {
		backgroundImage: `url(${isGameWon ? kenHappy : isGameLost ? kenSad : ken})`,
		border: 'none'
	};

	return (
		<div
			className={`header ${board.boardSize === 'small'
				? 'header--small'
				: board.boardSize === 'medium' ? 'header--medium' : 'header--large'}`}
		>
			<MinesCounter />
			<div className="header__ken" style={selectStyle} />
			<Timer />
		</div>
	);
};

export default Header;
