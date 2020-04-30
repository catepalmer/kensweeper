import React from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import '../sass/styles.scss';

const MinesCounter = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const mines = state ? state.mines : [];
	const flaggedSquares = state ? state.flaggedSquares : [];
	const minesFlagged = flaggedSquares && flaggedSquares.filter((square) => square);
	const minesRemaining = mines && mines.length - minesFlagged.length;

	return <div className="header__mines-counter">{minesRemaining}</div>;
};

export default MinesCounter;
