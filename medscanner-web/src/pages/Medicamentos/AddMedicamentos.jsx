import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TabelaListagem from "../../components/TabelaListagem/TabelaListagem";
import Form from "react-bootstrap/Form";

// Utils e helpers
import Loading from "../../components/Loading/Loading";
import { showMessage } from "../../helpers/message";
import { ValidaCampos } from "../../helpers/validacoes";

export default function AddMedicamentos() {
  const [tiposMedicamentos, setTiposMedicamentos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [_dadosMedicamentos, set_DadosMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    identificacao: false,
    concentracao: false,
    unidade: false,
    tipo: false
  })

  // Estado dos campos
  const [medicamento, setMedicamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [concentracao, setConcentracao] = useState();
  const [tipoMedicamentoId, setTipoMedicamentoId] = useState(0)
  const [unidadeId, setUnidadeId] = useState(0)


  // Campos a serem validados
  const campos = [
    { nome: "identificacao", type: "text" },
    { nome: "unidadeId", type: "number" },
    { nome: "concentracao", type: "text" },
    { nome: "tipoMedicamentoId", type: "number" },
  ];

  const handleMedicamentoChange = (event) => {
    setMedicamento(event.target.value)
    set_DadosMedicamentos({..._dadosMedicamentos, identificacao: event.target.value})
  };
  
  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value)
    set_DadosMedicamentos({..._dadosMedicamentos, descricao: event.target.value})
  };

  const handleTipoChange = (event) => {
    setTipoMedicamentoId(event.target.value)
    set_DadosMedicamentos({..._dadosMedicamentos, tipoMedicamentoId: event.target.value})
  };
  
  const handleConcentracaoChange = (event) => {
    set_DadosMedicamentos({..._dadosMedicamentos, concentracao: event.target.value})
  };
  
  const handleUnidadeChange = (event) => {
    setUnidadeId(event.target.value)
    set_DadosMedicamentos({..._dadosMedicamentos, unidadeId: event.target.value})
  };
  
  const db = axios.create({
    baseURL: process.env.REACT_APP_API,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await db.get("/TipoMedicamentos/getAll").then((result) => {
          setTiposMedicamentos(result.data);
          setLoading(false);
        });
        
        await db.get("/Unidades/getAll").then((result) => {
          setUnidades(result.data);
          setLoading(false);
        });
      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLimparCampos = () => {
    setMedicamento("")
    setDescricao("")
    setConcentracao("")
    set_DadosMedicamentos({})
    setTipoMedicamentoId(0)
    setUnidadeId(0)
  };

  const onSubmit = () => {
    const newErrors = ValidaCampos(campos, _dadosMedicamentos);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);  // Atualiza o estado de erros
      return;  // Interrompe a execução
    }

    setLoading(true);
    db.post("/Medicamentos/insert", _dadosMedicamentos).then((result) => {
      showMessage("Sucesso", "Medicamento cadastrado com sucesso!", "success", null);
      setLoading(false);
      handleLimparCampos()
    });
  }

  return (
    <Container>
      {loading && <Loading />}
      <Row>
        <Col md>
          <h4>Cadastrar</h4>
        </Col>
      </Row>

      <Row className="filtros">
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Medicamento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Medicamento"
              value={medicamento}
              onChange={(e) => {
                handleMedicamentoChange(e);
              }}
              isInvalid={!!errors.identificacao}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Concentração</Form.Label>
            <Form.Control
              type="number"
              placeholder="50"
              value={concentracao}
              onChange={(e) => {
                handleConcentracaoChange(e);
              }}
              isInvalid={errors.concentracao}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Unidade</Form.Label>
            <Form.Select 
              aria-label="Default select example" 
              onChange={(e) => handleUnidadeChange(e)} 
              value={unidadeId}
              isInvalid={!!errors.unidadeId}>
              <option value={0}>Selecione</option>
              {unidades?.map((m, index) => (
                <option key={index} value={m.id}>{m.identificacao}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => {
                handleDescricaoChange(e);
              }}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Tipo</Form.Label>
            <Form.Select 
              aria-label="Default select example" 
              value={tipoMedicamentoId}
              onChange={(e) => handleTipoChange(e)} 
              isInvalid={!!errors.tipoMedicamentoId}>
              <option value={0}>Selecione</option>
              {tiposMedicamentos?.map((m, index) => (
                <option key={index} value={m.id}>{m.identificacao}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="m-3 mb-0 mt-2 text-white"
            variant="info"
            style={{ backgroundColor: "#3F8576", borderColor: "#3F8576" }}
            onClick={onSubmit}
          >
            <i class="bi bi-plus"></i> Salvar
          </Button>{" "}
          {Object.keys(_dadosMedicamentos).length > 0 && (
              <>
                <Button
                  className="m-3 mb-0 mt-2 text-white"
                  variant="info"
                  style={{ backgroundColor: "#50BF84", borderColor: "#50BF84" }}
                  onClick={handleLimparCampos}
                >
                  <i class="bi bi-eraser"></i> Limpar Campos
                </Button>{" "}
              </>
            )}
        </Col>
      </Row>
    </Container>
  );
}
