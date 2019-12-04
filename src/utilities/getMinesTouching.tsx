import getSquaresTouching from './getSquaresTouching';

const getMinesTouching = (index: number | undefined, mines: number[] | undefined) => {
    const squaresTouchingArray = getSquaresTouching(index);
    if (mines && squaresTouchingArray) {
        const minesTouchingArray = squaresTouchingArray.filter(square =>
            mines.includes(square)
        );
        return minesTouchingArray.length;
    }
};

export default getMinesTouching;
