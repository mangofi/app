import Head from 'next/head'

import Navbar from "../organisms/navbar"
import StakedBalance from "../organisms/staked-balance"

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <StakedBalance />
      </main>
    </div>
  )
}
