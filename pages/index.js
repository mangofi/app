import Head from 'next/head'
import { Container, Row, Col, Card } from "react-bootstrap"

import Navbar from "../organisms/navbar"
import Balance from "../organisms/balance"
import StakedBalance from "../organisms/staked-balance"
import Stake from "../organisms/stake"
import Rewards from "../organisms/rewards"
import MarketCap from "../organisms/market-cap"
import Prices from "../organisms/prices"

export default function Home() {
  return (
    <Container fluid>
      <header>
        <Navbar />
      </header>
      <Row className="justify-content-md-center">
        <Col lg={{ span: 8 }}>
          <Row>
            <Col>
              <Balance />
            </Col>
            <Col>
              <MarketCap/>
            </Col>
            <Col>
              <Prices />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <StakedBalance />
            </Col>
            <Col>
              <Stake />
            </Col>
            <Col>
              <Rewards />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
