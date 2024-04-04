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
import { Card } from "react-bootstrap";
import Cards from "../components/Cards/Cards";
import { render } from "@testing-library/react";
import Modals from "../components/Modals/Modals";
import TabelaListagem from "../components/TabelaListagem/TabelaListagem";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [cliqueCard, setCliqueCard] = useState(false);

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

  // Cabeçalho e dados para testar o modal
  const headersTesteModal = [
    { value: "Medicamento", objectValue: "medicamento" },
    { value: "Data", objectValue: "data" },
  ]

  const dadosMedicamentosTesteModal = [
    {"medicamento": "Memantina", "data": "03/04/2024"},
    {"medicamento": "Sertralina", "data": "03/04/2024"},
  ]
  //-------------------------------------------------

  const [titleModal, setTitleModal] = useState("");
  const [textModal, setTextModal] = useState();

  // Definir a informação mostrada ao clicar em cada card
  const ModalElements = (card) => {
    var _titleModal = "";
    var _textModal;

    switch (card) {
      case 1:
        _titleModal = "Medicamentos próximos ao retorno"
        _textModal = <TabelaListagem headers={headersTesteModal} itens={dadosMedicamentosTesteModal} />
        break;
      
        case 2:
        _titleModal = "Quantidade de medicamentos"
        _textModal = "1000"
        
      default:
        break;
      }
      setTitleModal(_titleModal);
      setTextModal(_textModal);
  }

  return (
    <Container>
      {loading && <Loading />}
      {cliqueCard && <Modals close={setCliqueCard} title={titleModal} text={textModal} />}
      <Row className="justify-content-md-center">
        <Col className="d-flex justify-content-center" >
          <h1 className="title-page">Dashboard</h1>
        </Col>
      </Row>
      <Form className="text-black mb-4 shadow p-3 mb-5 bg-white rounded d-flex justify-content-center" style={{borderRadius: "15px",padding: "20px",}} >
        <Row>
          <Col onClick={() => {ModalElements(1)}}>
            <Cards titleHeader="Próximo ao retorno" titleCard="5" text="Clique para ver detalhes" textAlign="center" cursorType="pointer" click={setCliqueCard} />
          </Col>
          <Col onClick={() => {ModalElements(2)}}>
            <Cards titleHeader="Quantidade de Medicamentos" titleCard="1000" textAlign="center" cursorType="pointer" click={setCliqueCard} />
          </Col>
        </Row>
      </Form>
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
