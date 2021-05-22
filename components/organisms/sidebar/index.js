import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faMedium, faTelegram } from '@fortawesome/free-brands-svg-icons';

import SidebarMenu from 'components/molecules/sidebar-menu';
import SidebarMenuItem from 'components/molecules/sidebar-menu-item';
import ConnectButton from 'components/molecules/connect-button';

import YourWalletModal from 'components/organisms/your-wallet-modal';

import connector from 'lib/connector';

import {
  generateAddressUrl,
} from 'utils/bscscan';

import * as Styles from './styles';

const Sidebar = ({ wallet, walletActions, currentPage }) => {
  const [showYourWalletModal, setShowYourWalletModal] = useState(false);

  const displayYourWalletModal = () => {
    setShowYourWalletModal(true);
  };

  const hideYourWalletModal = () => {
    setShowYourWalletModal(false);
  };

  const logOut = () => {
    hideYourWalletModal();
    walletActions.logOut();
  };

  return (
    <Styles.Container>
      <Styles.StyledLogo />
      <ConnectButton onClick={displayYourWalletModal} />
      <YourWalletModal
        show={showYourWalletModal}
        address={wallet.account}
        onHide={hideYourWalletModal}
        onLogout={logOut}
        walletUrl={generateAddressUrl(wallet.account)}
      />
      <SidebarMenu>
        <SidebarMenuItem icon="🏡" href="/" active={currentPage === '/'}>
          Home
        </SidebarMenuItem>
        <SidebarMenuItem icon="👛" href="#" active={currentPage === '#'} disabled>
          MSwap
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
};

Sidebar.propTypes = {
  currentPage: PropTypes.string,
};

Sidebar.defaultProps = {
  currentPage: null,
};

export default connector(['wallet'], ['wallet'])(Sidebar);
