import styled from 'styled-components';

export const Select = styled.select`
      width: 75px;
      height: 38px;
      border-radius: 5px;
      color: tomato;
      & :focus,
      :hover {
        border: 1px solid tomato;
        box-shadow: none;
        outline: tomato;
      }
     & span {
      color: tomato;
    }
`;