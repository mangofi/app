import styled from 'styled-components';

export const Container = styled.div``;

export const Options = styled.div`
  background-color: var(--black700);
  border-radius: 23.5px;
  color: var(--black400);
  display: inline-block;
`;

export const Option = styled.div`
  background-color: ${({ active }) => (active ? 'var(--primary500)' : 'transparent')};
  border-radius: 23.5px;
  color: ${({ active }) => (active ? '#fff' : 'inherit')};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  line-height: 24px;
  padding: 13px 14px;
`;
