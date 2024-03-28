import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TabelaListagem from "../components/TabelaListagem/TabelaListagem";
import Form from "react-bootstrap/Form";

// Utils e helpers
import Loading from "../components/Loading/Loading";
import { showMessage } from "../helpers/message";

export default function CartaoControle() {
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [_dadosMedicamentos, set_DadosMedicamentos] = useState([]);
  const [isFiltro, setIsFiltro] = useState(false);
  const [loading, setLoading] = useState(false);

  const [headers, setHeardes] = useState([
    { value: "Data", objectValue: "data" },
    { value: "Medicamento", objectValue: "medicamento" },
    { value: "Quantidade", objectValue: "quantidade" },
    { value: "Retorno", objectValue: "dataRetorno" },
    { value: "Profissional", objectValue: "profissional" },
  ]);

  // Filtros
  const [medicamentoFiltro, setMedicamentoFiltro] = useState("");
  const [profissionalFiltro, setProfissionalFiltro] = useState("");
  const [dataInicialFiltro, setDataInicialFiltro] = useState("");
  const [dataFinalFiltro, setDataFinalFiltro] = useState("");

  const handleMedicamentoChange = (event) => {
    setMedicamentoFiltro(event.target.value);
  };

  const handleProfissionalChange = (event) => {
    setProfissionalFiltro(event.target.value);
  };

  const handleDataInicialChange = (event) => {
    setDataInicialFiltro(event.target.value);
  };

  const handleDataFinalChange = (event) => {
    setDataFinalFiltro(event.target.value);
  };

  const db = axios.create({
    baseURL: "http://localhost:8000",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await db.get("/card").then((result) => {
          setDadosMedicamentos(result.data);
          set_DadosMedicamentos(result.data);
          setLoading(false);
        });
      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFiltro = () => {
    // Resetar os dados para o estado original
    setDadosMedicamentos(dadosMedicamentos);

    // Verificar se algum filtro foi preenchido
    if (
      medicamentoFiltro === "" &&
      profissionalFiltro === "" &&
      dataInicialFiltro === "" &&
      dataFinalFiltro === ""
    ) {
      showMessage("Aviso", "Informe ao menos um dos campos!", "error", null);
      return;
    }

    // Criar uma cópia dos dados originais para aplicar os filtros
    let dadosFiltrados = [...dadosMedicamentos];

    if (medicamentoFiltro.trim() !== "") {
      dadosFiltrados = dadosFiltrados.filter((item) =>
        item.medicamento
          .toLowerCase()
          .includes(medicamentoFiltro.trim().toLowerCase())
      );
      dadosFiltrados.sort((a, b) => {
        return a.medicamento - b.medicamento;
      });
    }

    if (profissionalFiltro.trim() !== "") {
      dadosFiltrados = dadosFiltrados.filter((item) =>
        item.profissional
          .toLowerCase()
          .includes(profissionalFiltro.trim().toLowerCase())
      );
      dadosFiltrados.sort((a, b) => {
        return a.profissional - b.profissional;
      });
    }

    if (dataInicialFiltro.trim() !== "") {
      const dataInicial = new Date(dataInicialFiltro);
      dadosFiltrados = dadosFiltrados.filter(
        (item) =>
          moment(item.data, "DD/MM/YYYY") >= moment(dataInicial, "YYYY-MM-DD")
      );
      dadosFiltrados.sort((a, b) => {
        return moment(a.data, "DD/MM/YYYY") - moment(b.data, "DD/MM/YYYY");
      });
    }

    if (dataFinalFiltro.trim() !== "") {
      const dataFinal = new Date(dataFinalFiltro);
      dadosFiltrados = dadosFiltrados.filter(
        (item) =>
          moment(item.data, "DD/MM/YYYY") < moment(dataFinal, "YYYY-MM-DD")
      );
      dadosFiltrados.sort((a, b) => {
        return moment(a.data, "DD/MM/YYYY") - moment(b.data, "DD/MM/YYYY");
      });
    }

    setIsFiltro(true);
    setDadosMedicamentos(dadosFiltrados);
  };

  const handleLimparFiltro = () => {
    setMedicamentoFiltro("");
    setProfissionalFiltro("");
    setDataInicialFiltro("");
    setDataFinalFiltro("");
    setDadosMedicamentos(_dadosMedicamentos);
    setIsFiltro(false);
  };

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
          <h1 className="title-page">Cartão de Controle</h1>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col md>
          <h4>Filtros</h4>
        </Col>
      </Row>
      <Form
        className="text-black mb-4 shadow p-3 mb-5 bg-white rounded"
        style={{
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <Row className="filtros">
          <Col md>
            <Form.Group className="mb-3">
              <Form.Label>Medicamento</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={medicamentoFiltro}
                onChange={(e) => {
                  handleMedicamentoChange(e);
                }}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3">
              <Form.Label>Profissional</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={profissionalFiltro}
                onChange={(e) => {
                  handleProfissionalChange(e);
                }}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group controlId="date" bsSize="large">
              <Form.Label>Data Inicial</Form.Label>
              <Form.Control
                type="date"
                style={{ width: "100%" }}
                value={dataInicialFiltro}
                onChange={(e) => {
                  handleDataInicialChange(e);
                }}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group controlId="date" bsSize="large">
              <Form.Label>Data Final</Form.Label>
              <Form.Control
                type="date"
                style={{ width: "100%" }}
                value={dataFinalFiltro}
                onChange={(e) => {
                  handleDataFinalChange(e);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col className="d-flex justify-content-center" xs={5}>
            <Button
              className="mb-0 mt-0 text-white"
              variant="info"
              style={{ backgroundColor: "#3F8576", borderColor: "#3F8576" }}

              onClick={handleFiltro}
              >
              <i class="bi bi-funnel"></i> Filtrar
            </Button>{" "}
            {isFiltro && (
              <>
                <Button
                  className="m-3 mb-0 mt-0 text-white"
                  variant="info"
                  style={{ backgroundColor: "#50BF84", borderColor: "#50BF84" }}

                  onClick={handleLimparFiltro}
                >
                  <i class="bi bi-eraser"></i> Limpar Filtros
                </Button>{" "}
              </>
            )}
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Form>
      <Form
        className="text-black mb-4 shadow p-3 mb-5 bg-white rounded"
        style={{
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <Row className="justify-content-center">
          <Col>
            <TabelaListagem headers={headers} itens={dadosMedicamentos} />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
