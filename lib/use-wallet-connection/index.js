import {useEffect, useState} from "react"

import Connectors from "./connectors"

export default function useWalletConnection() {
  const connector = new Connectors.Walletconnect
  const [connection, setConnection] = useState(null)
  
  useEffect(async () => {
    await connector.load()
    setConnection(connector)
  }, [])
  
  return connection
}