import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Board from './Board';
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
    for (let i = 0; i < board.numSquares; i++) {
        squares.push(<Square key={i} index={i} />);
    }
    return squares;
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    dispatch(actions.setMines(mines));
    return (
        <StyledApp>
            <Board>{createSquares(smallBoard)}</Board>
        </StyledApp>
    );
};

export default App;
