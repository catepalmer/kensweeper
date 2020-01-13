import React from 'react';
import styled from 'styled-components';
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

import setMines from '../utilities/setMines';
import actions from '../actions/actions';

const StyledApp = styled.div`
    display: grid;
    font-family: 'Verdana', sans-serif;
    grid-template-areas: 'board';
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 100vw;
`;

type Board = {
    numSquares: number;
    numMines: number;
};

const smallBoard = {
    numSquares: 81,
    numMines: 10,
};

const mines = setMines(smallBoard);

const createSquares = (board: Board) => {
    let squares = [];
    for (let i = 0; i < board.numSquares + 1; i++) {
        if (i === 0) {
            squares.push(<Header />);
        } else {
            squares.push(<Square key={i} index={i} />);
        }
    }
    return squares;
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(actions.setMines(mines));
    }, [])
    const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
    const state = useSelector(state => state);
    const displayWin = state.moves.length + state.flaggedSquares.filter(square => square).length === smallBoard.numSquares;
    const displayLoss = state.losingSquare !== null;

    return (
        <StyledApp>
            <Board>{createSquares(smallBoard)}</Board>
            <NewGameButton />
            {displayWin ? <h1>YOU WON!</h1> : displayLoss ? <h1>YOU LOST!</h1> : ''}
        </StyledApp>
    );
};

export default App;
