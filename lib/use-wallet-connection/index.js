import {useEffect, useState} from "react"

import Connectors from "./connectors"

export default function useWalletConnection() {
  const connector = new Connectors.Walletconnect
  const [connection, setConnection] = useState(null)
  
  useEffect(async () => {
    // TODO: Validate if mobile or desktop to trigger correct load method
    await connector.load()
    setConnection(connector)
  }, [])
  
  return connection
}