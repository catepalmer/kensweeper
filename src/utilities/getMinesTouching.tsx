import getSquaresTouching from './getSquaresTouching';

const getMinesTouching = (
    index: number | undefined,
    mines: number[] | undefined,
    boardSize: string
) => {
    const squaresTouchingArray = getSquaresTouching(index, boardSize);
    if (mines && squaresTouchingArray) {
        const minesTouchingArray = squaresTouchingArray.filter(
            square => square !== undefined && mines.includes(square)
        );
        return minesTouchingArray.length;
    }
};

export default getMinesTouching;
