import styled from 'styled-components';

const Board = styled.div`
    align-self: center;
    display: grid;
    grid-area: board;
    grid-gap: 0;
    grid-template-columns: 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh;
    grid-template-rows: 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh;
    height: 63vh;
    justify-self: center;
    margin: auto;
    width: 63vh;
`;

export default Board;
