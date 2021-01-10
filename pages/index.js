import Head from 'next/head'
import { Container, Row, Col, Card } from "react-bootstrap"

import Navbar from "../organisms/navbar"
import StakedBalance from "../organisms/staked-balance"
import MarketCap from "../organisms/market-cap"

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
              <StakedBalance />
            </Col>
            <Col>
              <MarketCap/>
            </Col>
            <Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
