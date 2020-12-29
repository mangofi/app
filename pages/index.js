import Head from 'next/head'

import Navbar from "../organisms/navbar"

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        Content 2
      </main>
    </div>
  )
}
