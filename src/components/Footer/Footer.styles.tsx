import styled from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 100px 0 60px;
  text-align: center;
`;
