import styled from 'styled-components';

export const Container = styled.li`

`;

export const Link = styled.a`
  border-radius: 100px;
  color: ${({ active, small }) => {
    const initialColor = small ? 'var(--black600)' : 'var(--black700)';

    return active ? 'var(--primary500)' : initialColor;
  }};
  display: block;
  font-size: ${({ small }) => (small ? '14px' : '18px')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  padding: ${({ small }) => (small ? '6px 8px 6px 8px' : '8px')};
  width: 100%;

  i {
    font-style: normal;
    margin-right: ${({ small }) => (small ? '10px' : '18px')};
  }
  
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'transparent' : 'var(--primary100)')};
  }
  
  &:hover, &:active {
    color: ${({ disabled }) => {
    if (disabled) {
      return 'var(--black700)';
    }

    return 'var(--primary500)';
  }};
  }
`;
