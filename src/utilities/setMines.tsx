type Board = {
    numSquares: number;
    numMines: number;
};

type Mines = number[];

const setMines = (board: Board) => {
    let mines: Mines = [];
    while (mines.length < board.numMines) {
        let mine = Math.floor(Math.random() * board.numSquares);
        if (!mines.includes(mine)) mines.push(mine);
    }
    return mines;
};

export default setMines;
