import React, { useState } from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import '../sass/styles.scss';

const Timer = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const { initialTime, moves, flaggedSquares, board, losingSquare } = state;
	const [ time, setTime ] = useState(0);
	const isGameWon = moves.length + flaggedSquares.filter((square) => square).length === board.numSquares;
	const isGameLost = losingSquare !== null;

	const timer = () => {
		if (initialTime) {
			const newTime = new Date().getTime();
			const delta = newTime - initialTime;
			const secondsElapsed = Math.floor(delta / 1000);
			setTime(secondsElapsed);
		}
	};

	const timerInterval = setInterval(timer, 100);
	if (isGameWon || isGameLost) {
		clearInterval(timerInterval);
	}

	return <div>{time}</div>;
};

export default Timer;
