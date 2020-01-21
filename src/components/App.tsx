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
import Square from './Square';

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
    const { board, flaggedSquares, losingSquare, moves } = state;
    const { boardSize } = board;
    console.log(`moves: ${moves}`)

    useEffect(() => {
        dispatch(actions.setMines(mines));
        dispatch(actions.setBoardSize(board));
    }, [board]);

    const displayWin =
        moves.length + flaggedSquares.filter(square => square).length ===
        board.numSquares;
    const displayLoss = losingSquare !== null;

    return (
        <>
            <BoardSizeSelect />
            {displayWin ? (
                <h1>YOU WON!</h1>
            ) : displayLoss ? (
                <h1>YOU LOST!</h1>
            ) : (
                ''
            )}
            <div
                className={`grid ${
                    boardSize === 'small'
                        ? 'grid--small'
                        : boardSize === 'medium'
                        ? 'grid--medium'
                        : 'grid--large'
                }`}
            >
                <div
                    className={`board ${
                        boardSize === 'small'
                            ? 'board--small'
                            : boardSize === 'medium'
                            ? 'board--medium'
                            : 'board--large'
                    }`}
                >
                    {createSquares(board)}
                </div>
            </div>
        </>
    );
};

export default App;
