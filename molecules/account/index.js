import React from 'react'

import * as Styles from './styles'

export default ({
  address = "0x77dCA442175bae70E74889E1F272Eff6203CF818",
  connected = false
}) => {
  return (
    <Styles.Container>
      {connected ? (
        <Styles.Address onClick={() => {alert('view address in Etherscan')}} title={address}>
          {address.slice(0, 5)}…{address.slice(-4)}
        </Styles.Address>
      ) : (
        <Styles.ConnectBtn onClick={() => {alert('open metamask')}}>
          Connect Wallet
        </Styles.ConnectBtn>
      )}
    </Styles.Container>
  )
}