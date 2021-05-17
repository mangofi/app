import styled from 'styled-components';
import { Popper, Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#121212',
    color: '#fff',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    padding: '2px 17px',
  },
  arrow: {
    color: '#121212',
  },
}))(Tooltip);

export const CopyIcon = styled(FontAwesomeIcon)`
  color: var(--black500);
`;

export const Container = styled(CustomTooltip)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0 2px;
  position: relative;
  
  &:hover, &:hover {
    background-color: var(--black700);
    border-radius: 8px;
    cursor: pointer;
  }
`;

export const Address = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 450;
  line-height: 30px;
`;
