import React from 'react';
import '../sass/styles.scss';
import {
    useDispatch,
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { AppState } from '../reducers/index';
import Board from './Board';
import Header from './Header';
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

const mines = setMines(smallBoard);

const createSquares = (board: Board) => {
    let squares = [];
    for (let i = 0; i < board.numSquares; i++) {
        squares.push(<Square key={i} index={i} boardSize={board.boardSize} />);
    }
    return squares;
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(actions.setMines(mines));
    }, []);
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const state = useSelector(state => state);
    const displayWin =
        state.moves.length +
            state.flaggedSquares.filter(square => square).length ===
        smallBoard.numSquares;
    const displayLoss = state.losingSquare !== null;

    return (
        <div className="grid">
            <Board>{createSquares(smallBoard)}</Board>
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
