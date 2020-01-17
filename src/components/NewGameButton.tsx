import React from 'react';
import styled from 'styled-components';
import '../sass/styles.scss';

const StyledForm = styled.form`
    font-family: 'Verdana', sans-serif;
    height: fit-content;
`;

const NewGameButton: React.FC = () => {
    return (
        <StyledForm>
            <input type="submit" value="New Game" />
        </StyledForm>
    );
};

export default NewGameButton;
