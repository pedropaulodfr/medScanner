import React from "react";
import Logotipo from "../assets/logotipo.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function CartaoControle() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
            <h1>Cartão de Controle</h1>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
