import { useState, useEffect } from "react";
import Logotipo from "../assets/logotipo.png";
import axios from "axios";
import { showMessage } from "../helpers/message"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TabelaListagem from "../components/TabelaListagem/TabelaListagem";


export default function CartaoControle() {
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [headers, setHeardes] = useState([
    { value: "Data", objectValue: "data"},
    { value: "Medicamento", objectValue: "medicamento"},
    { value: "Quantidade", objectValue: "quantidade"},
    { value: "Retorno", objectValue: "dataRetorno"},
    { value: "Profissional", objectValue: "profissional"},
  ])

  const db = axios.create({
    baseURL: "http://localhost:8000"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await db.get('/card').then((result) => {
          setDadosMedicamentos(result.data);
          setLoading(false);
        })
      }
      catch (error) {
        console.error("Erro ao buscar dados:", error);
        showMessage(
          "Aviso",
          "Erro ao buscar dados: " + error,
          "error",
          null
        );
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
            <h1 className="title-page">Cartão de Controle</h1>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <TabelaListagem headers={headers} itens={dadosMedicamentos} />
        </Col>
      </Row>
    </Container>
  );
}