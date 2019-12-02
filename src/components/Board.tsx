import styled from 'styled-components';

const Board = styled.div`
  align-self: center;
  display: grid;
  grid-area: board;
  grid-gap: 0;
  grid-template-areas:
    'zero one two three four five six seven eight'
    'nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen'
    'eighteen nineteen twenty twenty-one twenty-two twenty-three twenty-four twenty-five twenty-six'
    'twenty-seven twenty-eight twenty-nine thirty thirty-one thirty-two thirty-three thirty-four thirty-five'
    'thirty-six thirty-seven thirty-eight thirty-nine forty forty-one forty-two forty-three forty-four'
    'forty-five forty-six forty-seven forty-eight forty-nine fifty fifty-one fifty-two fifty-three'
    'fifty-four fifty-five fifty-six fifty-seven fifty-eight fifty-nine sixty sixty-one sixty-two'
    'sixty-three sixty-four sixty-five sixty-six sixty-seven sixty-eight sixty-nine seventy seventy-one'
    'seventy-two seventy-three seventy-four seventy-five seventy-six seventy-seven seventy-eight seventy-nine eighty';
  grid-template-columns: 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh;
  grid-template-rows: 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh 7vh;
  height: 63vh;
  justify-self: center;
  margin: auto;
  width: 63vh;
`

export default Board;
