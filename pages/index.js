import Head from 'next/head'

import Navbar from "../organisms/navbar"

export default function Home() {
  return (
    <div>
      <Head>
        <title>MangoFi - The new flavor of DeFi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        Content
      </main>
    </div>
  )
}
