import styled from 'styled-components';

export const FoodItem = styled.div`
    display: flex;
    position: relative;
    font-size: 0.7rem;
    max-height: 1.5rem;
    align-items: center;
    padding: 0.3rem;
    color: ${props => props.dateDiff < 0 ? 'white' : 'black'};
    background-color: ${props => {
        if (props.dateDiff < 0) {
            return 'black';
        }
        if (props.dateDiff < 1) {
            return `#63876c`;
        }
        if(props.dateDiff < 2) {
            return `#54d574`;
        }
        if(props.dateDiff < 3) {
            return `#aaf0bb`;
        }
        return props.parity ? `#ffcad5` : `#ff8fa5`;
    }
    };

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
    max-width: 2rem;
`;

export const Icon = styled.span`
    cursor: pointer;
`;

export const InfoContainer = styled.div`
    display: ${props => props.hidden? 'none' : 'flex'};
    flex-direction: row;
    flex: 1 1 0;
`;

export const NameInput = styled.input`
    max-width: 5rem;
`;