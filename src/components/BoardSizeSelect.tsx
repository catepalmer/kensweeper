import React, { Fragment, useRef } from 'react';
import { useDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { smallBoard, medBoard, largeBoard } from '../constants';
import actions from '../actions/actions';
import setMines from '../utilities/setMines';
import '../sass/styles.scss';

const BoardSizeSelect = () => {
	const dispatch = useDispatch();
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

	return (
		<Fragment>
			<div className="select">
				New Game
				<div className="header__button" onClick={handleClick} />
				<div className="header__options-outer">
					<div className="header__options-inner u-hide" ref={options}>
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
			</div>
		</Fragment>
	);
};

export default BoardSizeSelect;
