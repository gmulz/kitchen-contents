import styled from 'styled-components';

export const FoodItem = styled.div`
    display: flex;
    position: relative;
    .react-datepicker {
        position: absolute;
        right: 0;
        z-index: 1000;
    }
`;

export const Description = styled.span`
    display: flex;
    justify-content: center;
    flex: 1 1 0;
`;

export const ExpirationDate = styled.span`
    display: flex;
    justify-content: center;
    flex: 1 1 0;
`;

export const QuantitySpinner = styled.input`
    max-width: 3rem;
`;

export const Icon = styled.span`
    cursor: pointer;
`;

export const InfoContainer = styled.div`
    display: ${props => props.hidden? 'none' : 'flex'};
    flex-direction: row;
    flex: 1 1 0;
`;