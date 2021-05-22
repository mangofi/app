import styled from 'styled-components';

import Logo from '../../atoms/logo';

export const Container = styled.div`
  margin-right: 84px;
  max-width: 233px;
  width: 100%;
`;

export const StyledLogo = styled(Logo)`
  margin-bottom: 22px;
`;

export const SmallLink = styled.a`
  color: var(--black500);
  
  & small {
    color: var(--black500);
  }
`;
