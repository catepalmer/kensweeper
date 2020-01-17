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
        } else if (boardSize === 'medium') {
            inTopRow = index < 12;
            inBottomRow = index > 132;
            inLeftColumn = index % 12 === 0;
            inRightColumn = (index + 1) % 12 === 0;
            aboveLeft = index - 13;
            above = index - 12;
            aboveRight = index - 11;
            belowLeft = index + 11;
            below = index + 12;
            belowRight = index + 13;
        } else if (boardSize === 'large') {
            inTopRow = index < 16;
            inBottomRow = index > 240;
            inLeftColumn = index % 16 === 0;
            inRightColumn = (index + 1) % 16 === 0;
            aboveLeft = index - 17;
            above = index - 16;
            aboveRight = index - 15;
            belowLeft = index + 15;
            below = index + 16;
            belowRight = index + 17;
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
