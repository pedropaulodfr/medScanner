import { useState, useEffect } from "react";
import Logotipo from "../assets/logotipo.png";
import axios from "axios";
import moment from "moment";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Utils e helpers
import Loading from "../components/Loading/Loading";
import { showMessage } from "../helpers/message";

// Importar Componentes
import { Calendario } from "../components/Graficos/Calendario/Calendario";
import { Colunas } from "../components/Graficos/Colunas/Colunas";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);

  const db = axios.create({
    baseURL: "http://localhost:8000",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await db.get("/card").then((result) => {
          setDadosMedicamentos(result.data);
          setLoading(false);
        });
      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data de retorno dos medicamentos
  const data = [
    [
      { type: "date", id: "Date" },
      { type: "number", id: "Won/Loss" },
    ],
  ];

  dadosMedicamentos.forEach((dr) => {
    const date = new Date(
      moment(dr.dataRetorno, "DD/MM/YYYY").format("YYYY/MM/DD")
    );
    data.push([date, 0]);
  });

  // Quantidade de medicamentos
  const medicamentosQuantidades = {};
  dadosMedicamentos.forEach((m) => {
    const { medicamento, quantidade } = m;
    if (medicamentosQuantidades[medicamento]) {
      medicamentosQuantidades[medicamento] += quantidade;
    } else {
      medicamentosQuantidades[medicamento] = quantidade;
    }
  });

  const dataQuantidades = [["Medicamento", "Quantidade", { role: "style" }]];

  Object.entries(medicamentosQuantidades).forEach(
    ([medicamento, quantidade], index) => {
      const style = index % 2 === 0 ? "#4374E0" : "#00C6FF"; // Alternando cores para visualização
      dataQuantidades.push([medicamento, quantidade, style]);
    }
  );

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-md-center">
        <Col className="d-flex justify-content-center" >
          <h1 className="title-page">Dashboard</h1>
        </Col>
      </Row>
      <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded" style={{borderRadius: "15px",padding: "20px",}} >
      <Row>
          <h3>Datas de Retorno</h3>
        </Row>
        <Row>
          <Col>
            <Calendario data={data} />
          </Col>
        </Row>
      </Form>
      <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded" style={{borderRadius: "15px",padding: "20px",}} >
        <Row>
          <h3>Estoque Medicamentos</h3>
        </Row>
        <Row>
          <Col>
            <Colunas data={dataQuantidades} />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
