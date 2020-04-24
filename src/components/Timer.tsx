import React, { useRef, useState, useEffect } from 'react';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import '../sass/styles.scss';

type Callback = () => void;
type Delay = number | null;

const Timer = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const { initialTime, moves, flaggedSquares, board, losingSquare } = state;
	const [ time, setTime ] = useState(0);
	const isGameOver =
		moves.length + flaggedSquares.filter((square) => square).length === board.numSquares || losingSquare !== null;

	const useInterval = (callback: Callback, delay: Delay) => {
		const savedCallback = useRef(callback);

		useEffect(
			() => {
				savedCallback.current = callback;
			},
			[ callback ]
		);

		useEffect(
			() => {
				const tick = () => {
					savedCallback.current();
				};
				if (delay !== null) {
					let id = setInterval(tick, delay);
					return () => clearInterval(id);
				}
			},
			[ delay ]
		);
	};

	const timer = () => {
		if (initialTime) {
			const newTime = new Date().getTime();
			const delta = newTime - initialTime;
			const secondsElapsed = Math.floor(delta / 1000);
			setTime(secondsElapsed);
		}
	};

	useInterval(timer, isGameOver ? null : 100);

	return <div>{time}</div>;
};

export default Timer;
