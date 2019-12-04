const getSquaresTouching = (index: number | undefined) => {
    if (index) {
        const inTopRow = index < 9;
        const inBottomRow = index > 72;
        const inLeftColumn = index % 9 === 0;
        const inRightColumn = (index + 1) % 9 === 0;
        const aboveLeft = index - 10;
        const above = index - 9;
        const aboveRight = index - 8;
        const left = index - 1;
        const right = index + 1;
        const belowLeft = index + 8;
        const below = index + 9;
        const belowRight = index + 10;
        let squaresTouchingArray;
    
        if (inTopRow) {
            if (inLeftColumn) {
                squaresTouchingArray = [right, below, belowRight];
            } else if (inRightColumn) {
                squaresTouchingArray = [left, belowLeft, below];
            } else {
                squaresTouchingArray = [left, right, belowLeft, below, belowRight];
            }
        } else if (inBottomRow) {
            if (inLeftColumn) {
                squaresTouchingArray = [above, aboveRight, right];
            } else if (inRightColumn) {
                squaresTouchingArray = [aboveLeft, above, left];
            } else {
                squaresTouchingArray = [aboveLeft, above, aboveRight, left, right];
            }
        } else {
            squaresTouchingArray = [
                aboveLeft,
                above,
                aboveRight,
                left,
                right,
                belowLeft,
                below,
                belowRight,
            ];
        }
        return squaresTouchingArray;
    }
};

export default getSquaresTouching;
