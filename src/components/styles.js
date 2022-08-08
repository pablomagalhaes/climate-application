import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border-color: #1890ff;
  background: #1890ff;
  // background-color: ${props => props.bg === 'black' ? 'black' : 'blue'};
  padding: 3px 10px;
  justify-self: flex-start!important;
  border-radius: 4px;
  transition: background-color .2s;

  :hover {
    opacity: 0.5;
  }
  &::disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;