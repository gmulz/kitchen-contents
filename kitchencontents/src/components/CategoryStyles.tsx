import styled from 'styled-components';
import DatePicker from 'react-datepicker';

export const NewFoodCreator = styled.div`
    position: relative;
    display: inline-block;

    .react-datepicker {
        position: absolute;
        right: 0;
        z-index: 1000;
    }
`;

export const QuantitySpinner = styled.input`
    max-width: 3rem;
`;

export const DateButton = styled.button`

`;