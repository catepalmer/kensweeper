import React, { useEffect } from 'react';
import '../sass/styles.scss';
import {
    useDispatch,
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../reducers/index';
import Board from './Board';
import BoardSizeSelect from './BoardSizeSelect';
import NewGameButton from './NewGameButton';
import Square from './Square';
import { smallBoard, medBoard, largeBoard } from '../constants';

import setMines from '../utilities/setMines';
import actions from '../actions/actions';

type Board = {
    boardSize: string;
    numSquares: number;
    numMines: number;
    colSize: number;
    rowSize: number;
};

const createSquares = (board: Board) => {
    let squares = [];
    for (let i = 0; i < board.numSquares; i++) {
        squares.push(<Square key={i} index={i} boardSize={board.boardSize} />);
    }
    return squares;
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const state = useSelector(state => state);
    const mines = setMines(state.board);

    useEffect(() => {
        dispatch(actions.setMines(mines));
        dispatch(actions.setBoardSize(state.board));
    }, []);

    const displayWin =
        state.moves.length +
            state.flaggedSquares.filter(square => square).length ===
        state.board.numSquares;
    const displayLoss = state.losingSquare !== null;

    return (
        <div className="grid">
            <div
                className={`board ${
                    state.board.boardSize === 'small'
                        ? 'board--small'
                        : state.board.boardSize === 'medium'
                        ? 'board--medium'
                        : 'board--large'
                }`}
            >
                {createSquares(state.board)}
            </div>
            <BoardSizeSelect />
            <NewGameButton />
            {displayWin ? (
                <h1>YOU WON!</h1>
            ) : displayLoss ? (
                <h1>YOU LOST!</h1>
            ) : (
                ''
            )}
        </div>
    );
};

export default App;
