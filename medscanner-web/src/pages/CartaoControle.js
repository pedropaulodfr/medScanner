import { useState } from "react";
import Logotipo from "../assets/logotipo.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TabelaListagem from "../components/TabelaListagem/TabelaListagem";


export default function CartaoControle() {
  const [headers, setHeardes] = useState([
    { value: "Data", objectValue: "data"},
    { value: "Medicamento", objectValue: "medicamento"},
    { value: "Quantidade", objectValue: "quantidade"},
    { value: "Retorno", objectValue: "dataRetorno"},
    { value: "Profissional", objectValue: "profissional"},
  ])

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
            <h1>Cartão de Controle</h1>
            <TabelaListagem headers={headers} />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
