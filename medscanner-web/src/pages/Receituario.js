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

export default function Receituario() {
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [_dadosMedicamentos, set_DadosMedicamentos] = useState([]);
  const [isFiltro, setIsFiltro] = useState(false);
  const [loading, setLoading] = useState(false);

  const headers = [
    { value: "Medicamento", objectValue: "medicamento" },
    { value: "Dose", objectValue: "dose" },
    { value: "Frequência", objectValue: "frequencia" },
  ];

  // Filtros
  const [medicamentoFiltro, setMedicamentoFiltro] = useState("");

  const handleMedicamentoChange = (event) => {
    setMedicamentoFiltro(event.target.value);
  };

  const db = axios.create({
    baseURL: "http://localhost:8000",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await db.get("/posologia").then((result) => {

        result.data.map(m => {
            m.dose = m.dose > 1 ? `${m.dose} ${m.tipo}s` : `${m.dose} ${m.tipo}`;
            m.frequencia = m.frequencia > 1 ? `${m.frequencia} vezes por ${m.tempo} pela ${m.periodo}` : `${m.frequencia} vez por ${m.tempo} pela ${m.periodo}`;
        })

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
      medicamentoFiltro === ""
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

    setIsFiltro(true);
    setDadosMedicamentos(dadosFiltrados);
  };

  const handleLimparFiltro = () => {
    setMedicamentoFiltro("");
    setDadosMedicamentos(_dadosMedicamentos);
    setIsFiltro(false);
  };

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-md-center">
        <Col className="d-flex justify-content-center" >
          <h1 className="title-page">Receituário</h1>
        </Col>
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
          <Col md="3">
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
          <Col className=" mt-4" xs={0}>
            <Button
              className="mb-0 mt-2 text-white"
              variant="info"
              style={{ backgroundColor: "#3F8576", borderColor: "#3F8576" }}
              onClick={handleFiltro}
              >
              <i class="bi bi-funnel"></i> Filtrar
            </Button>{" "}
            {isFiltro && (
              <>
                <Button
                  className="m-3 mb-0 mt-2 text-white"
                  variant="info"
                  style={{ backgroundColor: "#50BF84", borderColor: "#50BF84" }}
                  onClick={handleLimparFiltro}
                >
                  <i class="bi bi-eraser"></i> Limpar Filtros
                </Button>{" "}
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
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
