const getSquaresTouching = (index: number | undefined, boardSize: string) => {
    if (index !== undefined) {
        const left = index - 1;
        const right = index + 1;
        let inTopRow;
        let inBottomRow;
        let inLeftColumn;
        let inRightColumn;
        let aboveLeft;
        let above;
        let aboveRight;
        let belowLeft;
        let below;
        let belowRight;
        let squaresTouchingArray;

        if (boardSize === 'small') {
            inTopRow = index < 8;
            inBottomRow = index > 56;
            inLeftColumn = index % 8 === 0;
            inRightColumn = (index + 1) % 8 === 0;
            aboveLeft = index - 9;
            above = index - 8;
            aboveRight = index - 7;
            belowLeft = index + 7;
            below = index + 8;
            belowRight = index + 9;
            squaresTouchingArray;
        }

        if (inTopRow) {
            if (inLeftColumn) {
                squaresTouchingArray = [right, below, belowRight];
            } else if (inRightColumn) {
                squaresTouchingArray = [left, belowLeft, below];
            } else {
                squaresTouchingArray = [
                    left,
                    right,
                    belowLeft,
                    below,
                    belowRight,
                ];
            }
        } else if (inBottomRow) {
            if (inLeftColumn) {
                squaresTouchingArray = [above, aboveRight, right];
            } else if (inRightColumn) {
                squaresTouchingArray = [aboveLeft, above, left];
            } else {
                squaresTouchingArray = [
                    aboveLeft,
                    above,
                    aboveRight,
                    left,
                    right,
                ];
            }
        } else if (inLeftColumn) {
            squaresTouchingArray = [
                above,
                aboveRight,
                right,
                below,
                belowRight,
            ];
        } else if (inRightColumn) {
            squaresTouchingArray = [aboveLeft, above, left, belowLeft, below];
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
