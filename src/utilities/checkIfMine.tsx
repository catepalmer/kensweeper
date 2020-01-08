const checkIfMine = (index: number, mines: number[] | undefined) => {
    if (mines) {
        return mines.includes(index);
    }
};

export default checkIfMine;
