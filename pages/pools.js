import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faMedium, faTelegram } from '@fortawesome/free-brands-svg-icons'

import Logo from "../atoms/logo"
import ConnectButton from "../molecules/connect-button"

export default function Home() {
  return (
    <Container fluid className="p-0 w-100 mt-3">
      <div style={{ paddingLeft: 114, paddingRight: 114, display: 'flex', flexDirection: 'row' }}>
        <div>
          <Logo />
          <ConnectButton />
          <ul className="list-unstyled">
            <li>
              <Link href="/" className="text-primary">
                <a><i>🏡</i> Home</a>
              </Link>
            </li>
            <li>
              <a href="#"><i>👛</i> Exchange</a>
            </li>
            <li>
              <Link href="/pools">
                <a className="text-primary"><i>🌴</i> Pools</a>
              </Link>
            </li>
            <li>
              <a href="#"><i>🚜</i> Farm</a>
            </li>
            <li>
              <a href="#"><i>💰</i> Lottery</a>
            </li>
            <li>
              <a href="#"><i>💎</i> Collectibles</a>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li>
              <a href="#"><FontAwesomeIcon icon={faUsers}/> About us</a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faFileAlt}/> Docs</a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faTwitter}/> Twitter</a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faMedium}/> Medium</a>
            </li>
            <li>
              <a href="#"><FontAwesomeIcon icon={faTelegram}/> Telegram</a>
            </li>
          </ul>
          <ul className="list-inline">
            <li className="list-inline-item"><small>Privacy</small></li>
            <li className="list-inline-item"><small>Terms</small></li>
            <li className="list-inline-item"><small>mangoFi © {new Date().getFullYear()}</small></li>
          </ul>
        </div>
        <div className="d-flex flex-fill" style={{ paddingLeft: 84 }}>
          <h1>Pools 🌴</h1>
        </div>
      </div>
    </Container>
  )
}
