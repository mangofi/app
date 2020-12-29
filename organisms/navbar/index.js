import React from 'react'

import Account from "../../molecules/account"

import * as Styles from './styles'

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
            <Styles.MenuLink href="/farms">Farms</Styles.MenuLink>
          </Styles.MenuItem>
          <Styles.MenuItem>
            <Styles.MenuLink href="/stake">Stake</Styles.MenuLink>
          </Styles.MenuItem>
        </Styles.Menu>
      </Styles.MenuContainer>
      <Styles.AccountContainer>
        <Account />
      </Styles.AccountContainer>
    </Styles.Container>
  )
}