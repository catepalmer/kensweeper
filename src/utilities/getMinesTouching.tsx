import getSquaresTouching from './getSquaresTouching';

const getMinesTouching = (index: number, mines: number[] | undefined) => {
    const squaresTouchingArray = getSquaresTouching(index);
    if (mines) {
        const minesTouchingArray = squaresTouchingArray.filter(square =>
            mines.includes(square)
        );
        return minesTouchingArray.length;
    }
};

export default getMinesTouching;
