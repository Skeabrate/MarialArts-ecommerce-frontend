import styled from 'styled-components';

interface Props {
  $isOpen: boolean;
}

export const StyledCartModal = styled.aside<Props>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: grey;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0%)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  padding: 20px;

  ${({ theme }) => theme.mq.tablet} {
    width: 550px;
  }
`;

export const StyledCloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: red;
  position: absolute;
  top: 10px;
  right: 10px;
`;
