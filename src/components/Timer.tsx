import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import actions from '../actions/actions';
import '../sass/styles.scss';

type Callback = () => void;
type Delay = number | null;

const Timer = () => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const state = useSelector((state) => state);
	const { initialTime, moves, flaggedSquares, board, losingSquare, time, isGameInProgress } = state;
	const dispatch = useDispatch();
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
			dispatch(actions.setTime(secondsElapsed));
		}
	};

	useInterval(timer, isGameOver || !isGameInProgress ? null : 100);

	return <div>{time}</div>;
};

export default Timer;
