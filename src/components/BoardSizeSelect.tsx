import React, { Fragment, useRef } from 'react';
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
	const options = useRef<HTMLDivElement | null>(null);
	const smallOption = useRef<HTMLDivElement | null>(null);
	const mediumOption = useRef<HTMLDivElement | null>(null);
	const largeOption = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		if (options.current && smallOption.current && mediumOption.current && largeOption.current) {
			const isOptionsHidden = options.current.classList.contains('u-hide');

			if (isOptionsHidden) {
				options.current.classList.remove('u-hide');
			}
		}
	};

	const handleClickOption = (value: string) => {
		if (options.current) {
			const boardSizes = [ smallBoard, medBoard, largeBoard ];
			const board = boardSizes.find((boardType) => {
				return boardType.boardSize === value;
			});
			if (board) {
				const mines = setMines(board);
				dispatch(actions.setBoardSize(board));
				dispatch(actions.setMines(mines));
				dispatch(actions.setTime(0));
				dispatch(actions.setInitialTime(undefined));
				dispatch(actions.setGameInProgress(false));
			}
			options.current.classList.add('u-hide');
		}
	};

	const selectStyle = {
		backgroundImage: `url(${isGameWon ? kenHappy : isGameLost ? kenSad : ken})`,
		border: 'none'
	};

	return (
		<Fragment>
			<div className="header__select">
				<div className="header__button" style={selectStyle} onClick={handleClick} />
				<div className="header__options u-hide" ref={options}>
					<div className="header__option" ref={smallOption} onClick={() => handleClickOption('small')}>
						Small
					</div>
					<div className="header__option" ref={mediumOption} onClick={() => handleClickOption('medium')}>
						Medium
					</div>
					<div className="header__option" ref={largeOption} onClick={() => handleClickOption('large')}>
						Large
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default BoardSizeSelect;
