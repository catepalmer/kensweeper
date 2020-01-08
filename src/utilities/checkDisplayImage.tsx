const checkDisplayImage = (
    isPlayed: boolean | undefined,
    isMine: boolean | undefined,
    isFlagged: boolean | undefined,
    minesTouching: number | undefined,
    losingSquare: number | null | '' | undefined
) => {
    return (
        (isPlayed && minesTouching === 0) ||
        (losingSquare && isMine) ||
        isFlagged
    );
};

export default checkDisplayImage;
