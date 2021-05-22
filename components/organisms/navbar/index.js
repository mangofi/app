import React from 'react';

import ConnectButton from 'components/molecules/connect-button';

import * as Styles from './styles';

export default function Navbar() {
  return (
    <Styles.Container>
      <Styles.LogoContainer>
        <Styles.MenuLink href="/">
          MangoFi 🥭
        </Styles.MenuLink>
      </Styles.LogoContainer>
      <Styles.MenuContainer>
        <Styles.Menu>
          <Styles.MenuItem>
            <Styles.MenuLink href="/stake">Stake</Styles.MenuLink>
          </Styles.MenuItem>
        </Styles.Menu>
      </Styles.MenuContainer>
      <Styles.AccountContainer>
        <ConnectButton />
      </Styles.AccountContainer>
    </Styles.Container>
  );
}
