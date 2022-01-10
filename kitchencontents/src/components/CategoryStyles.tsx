import styled from 'styled-components';

export const CategoryContainer = styled.div`
    min-width: 215px;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const CategoryHeader = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
`;

export const CategoryTitleContainer = styled.div`
    margin-bottom: .2rem;
`;

export const CategoryTitle = styled.span``;

export const NewFoodCreator = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 0;
    width: 100%;
    max-height: 2rem;
    .react-datepicker {
        position: absolute;
        right: 0;
        z-index: 1000;
        top: 1.5rem;
    }
`;

export const NameInput = styled.input`
    flex: 1 2 100px;
    min-width: 100px;
`;

export const QuantitySpinner = styled.input`
    max-width: 2rem;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 20px;
`;

export const DateButton = styled.button`
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 80px;
`;