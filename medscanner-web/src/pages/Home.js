import React from "react";
import Logotipo from "../assets/logotipo.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Home() {
  const handleCard = () => {
    window.location.href = "/card";
  }

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
          <div
            className="logo"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Logotipo} width={100} />
            <h1 style={{ fontSize: 30, color: "gray" }}>MedScanner</h1>
          </div>
        </Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-md-center">
        <hr></hr>
        <Col></Col>
        <Col md="auto">
            <h4 style={{color: 'gray'}}>O que deseja fazer?</h4>
        </Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col md="auto">
            <Button variant="outline-info" onClick={handleCard} >Verificar Cartão</Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
