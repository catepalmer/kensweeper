const setInitialFlaggedSquares = (numSquares: number) => {
    let squares = [];
    for (let i = 0; i < numSquares; i++) {
        squares.push(false);
    }
    return squares;
};

export default setInitialFlaggedSquares;
