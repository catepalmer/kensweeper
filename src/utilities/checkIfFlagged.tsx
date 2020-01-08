const checkIfFlagged = (index: number, flaggedSquares: boolean[]) => {
    if (flaggedSquares) {
        return flaggedSquares.find((square, i) => i === index);
    }
};

export default checkIfFlagged;
