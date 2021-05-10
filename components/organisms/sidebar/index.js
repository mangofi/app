import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faMedium, faTelegram } from '@fortawesome/free-brands-svg-icons';

import SidebarMenu from 'components/molecules/sidebar-menu';
import SidebarMenuItem from 'components/molecules/sidebar-menu-item';

import ConnectButton from 'components/molecules/connect-button';

import * as Styles from './styles';

const Sidebar = ({ currentPage }) => (
  <Styles.Container>
    <Styles.StyledLogo />
    <ConnectButton />
    <SidebarMenu>
      <SidebarMenuItem icon="🏡" href="/" active={currentPage === '/'}>
        Home
      </SidebarMenuItem>
      <SidebarMenuItem icon="👛" href="#" active={currentPage === '#'} disabled>
        Exchange
      </SidebarMenuItem>
      <SidebarMenuItem icon="🌴" href="/pools" active={currentPage === '/pools'}>
        Pools
      </SidebarMenuItem>
      <SidebarMenuItem icon="🚜" href="#" active={currentPage === '#'}>
        Farm
      </SidebarMenuItem>
      <SidebarMenuItem icon="💸" href="#" active={currentPage === '#'} disabled>
        Fortune
      </SidebarMenuItem>
      <SidebarMenuItem icon="💎" href="#" active={currentPage === '#'}>
        Collectibles
      </SidebarMenuItem>
    </SidebarMenu>
    <SidebarMenu>
      <SidebarMenuItem small href="#" icon={<FontAwesomeIcon icon={faUsers} fixedWidth />}>
        About us
      </SidebarMenuItem>
      <SidebarMenuItem small href="#" icon={<FontAwesomeIcon icon={faFileAlt} fixedWidth />}>
        Docs
      </SidebarMenuItem>
      <SidebarMenuItem small href="#" icon={<FontAwesomeIcon icon={faTwitter} fixedWidth />}>
        Twitter
      </SidebarMenuItem>
      <SidebarMenuItem small href="#" icon={<FontAwesomeIcon icon={faMedium} fixedWidth />}>
        Medium
      </SidebarMenuItem>
      <SidebarMenuItem small href="#" icon={<FontAwesomeIcon icon={faTelegram} fixedWidth />}>
        Telegram
      </SidebarMenuItem>
    </SidebarMenu>
    <ul className="list-inline">
      <li className="list-inline-item">
        <Link href="#" passHref>
          <Styles.SmallLink>
            <small>Privacy</small>
          </Styles.SmallLink>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link href="#" passHref>
          <Styles.SmallLink><small>Terms</small></Styles.SmallLink>
        </Link>
      </li>
      <li className="list-inline-item">
        <Styles.SmallLink>
          <small>
            mangoFi ©
            {' '}
            {new Date().getFullYear()}
          </small>
        </Styles.SmallLink>
      </li>
    </ul>
  </Styles.Container>
);

Sidebar.propTypes = {
  currentPage: PropTypes.string,
};

Sidebar.defaultProps = {
  currentPage: null,
};

export default Sidebar;
