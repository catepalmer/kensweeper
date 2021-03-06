import React, { MouseEvent } from 'react';
import '../sass/styles.scss';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { AppState } from '../reducers/index';
import checkDisplayImage from '../utilities/checkDisplayImage';
import checkDisplayMinesTouching from '../utilities/checkDisplayMinesTouching';
import checkIfFlagged from '../utilities/checkIfFlagged';
import checkIfMine from '../utilities/checkIfMine';
import checkIfPlayed from '../utilities/checkIfPlayed';
import getMinesTouching from '../utilities/getMinesTouching';
import setFlaggedSquares from '../utilities/setFlaggedSquares';
import actions from '../actions/actions';

import flag from '../images/flag.png';
import ken from '../images/ken.jpg';
import kenSad from '../images/ken-sad.png';
import kenHappy from '../images/ken-sunglasses.png';
import mine from '../images/mine.png';
import getSquaresTouching from '../utilities/getSquaresTouching';

type SquareProps = {
	index: number;
	boardSize: string;
};

const Square = ({ index, boardSize }: SquareProps) => {
	const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const { mines, moves, flaggedSquares, board, losingSquare } = state;
	const isMine = checkIfMine(index, mines);
	const isLosingSquare = losingSquare === index;
	const isFlagged = checkIfFlagged(index, flaggedSquares);
	const isPlayed = checkIfPlayed(index, moves);
	const minesTouching = getMinesTouching(index, mines, boardSize);
	const displayMinesTouching = checkDisplayMinesTouching(isPlayed, isMine, isFlagged, minesTouching);
	const displayImage = checkDisplayImage(isPlayed, isMine, isFlagged, minesTouching, losingSquare);
	const isGameWon = moves.length + flaggedSquares.filter((square) => square).length === board.numSquares;
	const isGameLost = losingSquare !== null;
	const imageSrc = isFlagged
		? flag
		: isMine
			? mine
			: minesTouching === 0 && isGameWon ? kenHappy : minesTouching === 0 && isGameLost ? kenSad : ken;

	const handleRightClick = (e: MouseEvent) => {
		e.preventDefault();
		if (!isPlayed) {
			dispatch(actions.flagSquare(index));
		}
	};

	const handleClick = () => {
		if (isGameWon || isGameLost || isFlagged) return;
		dispatch(isMine ? actions.clickMine(index) : actions.clickSquare(index));
		const initialTime = new Date().getTime();
		dispatch(actions.setInitialTime(initialTime));
		dispatch(actions.setGameInProgress(true));
	};

	return (
		<div
			onClick={handleClick}
			onContextMenu={(e: MouseEvent) => handleRightClick(e)}
			className={`square 
                ${isLosingSquare
					? 'square--losing'
					: minesTouching === 1
						? 'u-color-magenta'
						: minesTouching === 2
							? 'u-color-purple'
							: minesTouching === 3
								? 'u-color-blue-dark'
								: minesTouching === 4
									? 'u-color-green'
									: minesTouching === 5
										? 'u-color-teal-dark'
										: minesTouching === 6
											? 'u-color-teal-light'
											: minesTouching === 7
												? 'u-color-pink-hot'
												: minesTouching === 8 ? 'u-color-blue-light' : ''}`}
		>
			{displayMinesTouching ? minesTouching : displayImage ? <img src={imageSrc} className="image--small" /> : ''}
		</div>
	);
};

export default Square;
