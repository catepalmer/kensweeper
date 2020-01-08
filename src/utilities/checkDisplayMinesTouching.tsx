const checkDisplayMinesTouching = (
    isPlayed: boolean | undefined,
    isMine: boolean | undefined,
    isFlagged: boolean | undefined,
    minesTouching: number | undefined
) => {
    return (
        isPlayed && !isMine && !isFlagged && minesTouching && minesTouching > 0
    );
};

export default checkDisplayMinesTouching;
