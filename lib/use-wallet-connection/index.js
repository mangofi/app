import {useEffect, useState} from "react"

import WalletConnection from "./wallet-connection"

export default function useWalletConnection() {
  const [connection, setConnection] = useState(null)
  
  useEffect(async () => {
    const conn = new WalletConnection
    await conn.load()
    setConnection(conn)
  }, [])
  
  return connection
}