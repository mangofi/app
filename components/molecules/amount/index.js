import React from 'react'

import * as Styles from './styles'

export default function Amount({ children, currency = 'MNGO' }) {
  return (
    <Styles.Container>
      {children} {currency}
    </Styles.Container>
  )
}