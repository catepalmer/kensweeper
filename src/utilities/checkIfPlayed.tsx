const checkIfPlayed = (index: number, moves: (number | undefined)[]) => {
    if (moves) {
        return moves.includes(index);
    }
};

export default checkIfPlayed;
