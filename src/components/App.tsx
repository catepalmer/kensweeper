import React from 'react';
import styled from 'styled-components';

import Board from './Board';
import Square from './Square';

import setMines from '../utilities/setMines';

const StyledApp = styled.div`
  display: grid;
  font-family: 'Verdana', sans-serif;
  grid-template-areas: 'board';
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
`

type Board = {
  numSquares: number;
  numMines: number;
}

const smallBoard = {
  numSquares: 81,
  numMines: 10
}

const createSquares = (board: Board) => {
  const mines = setMines(smallBoard);
  let squares = [];
  for (let i = 0; i < board.numSquares; i++) {
    const isMine = mines.find(mine => mine === i);
    if (isMine) squares.push(<Square key={i} index={i} isMine={true} />);
    else squares.push(<Square key={i} index={i} isMine={false} />)
  }
  return squares;
};

const App: React.FC = () => {
  return (
    <StyledApp>
      <Board>
        {createSquares(smallBoard)}
      </Board>
    </StyledApp>
  );
}

export default App;
