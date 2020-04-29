import React from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import ken from '../images/ken.jpg';
import kenSad from '../images/ken-sad.png';
import kenHappy from '../images/ken-sunglasses.png';
import '../sass/styles.scss';

const Ken = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const { moves, flaggedSquares, board, losingSquare } = state;
	const isGameWon = moves.length + flaggedSquares.filter((square) => square).length === board.numSquares;
	const isGameLost = losingSquare !== null;

	console.log(state);

	return (
		<div className="ken">
			<img src={isGameWon ? kenHappy : isGameLost ? kenSad : ken} className="image--small" />
		</div>
	);
};

export default Ken;
