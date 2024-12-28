import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Utils e helpers
import Loading from "../../components/Loading/Loading";
import { showMessage } from "../../helpers/message";
import { ValidaCampos } from "../../helpers/validacoes";
import { useApi } from "../../api/useApi";

const AddReceituarios = ({ handleReturn, dadosEdicao = [] }) => {
  const api = useApi();
  const [dadosReceituario, setDadosReceituario] = useState([]);
  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [listaTipos, setListaTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    identificacao: false,
  });
  
  // Estado dos campos
  const [medicamentoId, setMedicamentoId] = useState(0);
  const [frequencia, setFrequencia] = useState(null);
  const [tempo, setTempo] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [dose, setDose] = useState("");
  const [tipoId, setTipoId] = useState(0);

  // Campos a serem validados
  const campos = [
    { nome: "medicamentoId", type: "number" },
    { nome: "frequencia", type: "number" },
    { nome: "tempo", type: "text" },
    { nome: "periodo", type: "text" },
    { nome: "dose", type: "text" },
    { nome: "tipoMedicamentoId", type: "number" },
  ];

  // Períodos
  const periodos = ["Manhã", "Tarde", "Noite"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        api.get("/Medicamentos/getAll").then((result) => {
          setListaMedicamentos(result.data);
          setLoading(false);
        });

        api.get("/TipoMedicamentos/getAll").then((result) => {
          setListaTipos(result.data);
          setLoading(false);
        });
      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(dadosEdicao).length > 0) {
      setMedicamentoId(dadosEdicao.medicamentoId)
      setFrequencia(dadosEdicao.frequencia)
      setTempo(dadosEdicao.tempo)
      setPeriodo(dadosEdicao.periodo)
      setDose(dadosEdicao.dose)
      setTipoId(dadosEdicao.tipoMedicamentoId)

      setDadosReceituario({
        ...dadosReceituario,
        id: dadosEdicao.id,
        medicamentoId: dadosEdicao.medicamentoId,
        frequencia: dadosEdicao.frequencia,
        tempo: dadosEdicao.tempo,
        periodo: dadosEdicao.periodo,
        dose: dadosEdicao.dose,
        tipoMedicamentoId: dadosEdicao.tipoMedicamentoId,
      });
    }
  }, []);

  const handleMedicamentoChange = (event) => {
    setMedicamentoId(event.target.value);
    setDadosReceituario({
      ...dadosReceituario,
      medicamentoId: event.target.value,
    });
  };

  const handleFrequenciaChange = (event) => {
    setFrequencia(event.target.value);
    setDadosReceituario({
      ...dadosReceituario,
      frequencia: event.target.value,
    });
  };

  const handleTempoChange = (event) => {
    setTempo(event.target.value);
    setDadosReceituario({
      ...dadosReceituario,
      tempo: event.target.value,
    });
  };

  const handlePeriodoChange = (event) => {
    setPeriodo(event.target.value);
    setDadosReceituario({
      ...dadosReceituario,
      periodo: event.target.value,
    });
  };
  
  const handleDoseChange = (event) => {
    setDose(event.target.value);
    setDadosReceituario({
      ...dadosReceituario,
      dose: event.target.value,
    });
  };
  
  const handleTipoChange = (event) => {
    setTipoId(event.target.value);
    setDadosReceituario({
      ...dadosReceituario,
      tipoMedicamentoId: event.target.value,
    });
  };
 
  const handleLimparCampos = () => {
    setMedicamentoId(0)
    setFrequencia("")
    setTempo("")
    setPeriodo("")
    setDose("")
    setTipoId(0)
    setDadosReceituario({});
  };

  const onSubmit = () => {
    const newErrors = ValidaCampos(campos, dadosReceituario);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Atualiza o estado de erros
      return; // Interrompe a execução
    }

    setLoading(true);
    if (Object.keys(dadosEdicao).length == 0) {
      api.post("/Receituario/insert", dadosReceituario)
        .then((result) => {
          if (result.status !== 200)
            throw new Error("Houve um erro ao tentar cadastrar o receituário!");

          showMessage(
            "Sucesso",
            "Receituário cadastrado com sucesso!",
            "success",
            null
          );
          setLoading(false);
          handleLimparCampos();
        })
        .catch((err) => {
          showMessage("Erro", err, "error", null);
          setLoading(false);
        });
    } else {
      api.put("/Receituario/update", dadosReceituario)
        .then((result) => {
          if (result.status !== 200)
            throw new Error("Houve um erro ao tentar editar o receituário!");

          showMessage(
            "Sucesso",
            "Receituário editado com sucesso!",
            "success",
            () => {
              handleReturn();
            }
          );
          setLoading(false);
          handleLimparCampos();
        })
        .catch((err) => {
          showMessage("Erro", err, "error", null);
          setLoading(false);
        });
    }
  };

  return (
    <Container>
      {loading && <Loading />}
      <Row>
        <Col>
          <Button
            className="mb-5 mt-2 text-white"
            variant="secondary"
            onClick={handleReturn}
          >
            <i class="bi bi-arrow-left"></i> Voltar
          </Button>{" "}
        </Col>
      </Row>
      <Row>
        <Col md>
          <h4>
            {Object.keys(dadosEdicao).length == 0 ? "Cadastrar" : "Editar"}
          </h4>
        </Col>
      </Row>
      <Row className="filtros">
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="text-danger">*</span> Medicamento
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={medicamentoId}
              onChange={(e) => handleMedicamentoChange(e)}
              isInvalid={!!errors.medicamentoId}
            >
              <option value={0}>Selecione</option>
              {listaMedicamentos?.map((m, index) => (
                <option key={index} value={m.id}>
                  {m.identificacao}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Frequência</Form.Label>
            <Form.Control
              type="number"
              placeholder="Frequência"
              value={frequencia}
              onChange={(e) => {
                handleFrequenciaChange(e);
              }}
              isInvalid={!!errors.frequencia}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Tempo</Form.Label>
            <Form.Control
              type="text"
              placeholder="dia, semana, mês"
              value={tempo}
              onChange={(e) => {
                handleTempoChange(e);
              }}
              isInvalid={!!errors.tempo}
            />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="text-danger">*</span> Período
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={periodo}
              onChange={(e) => handlePeriodoChange(e)}
              isInvalid={!!errors.periodo}
            >
              <option value={0}>Selecione</option>
              {periodos?.map((m, index) => (
                <option key={index} value={m}>{m}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label><span className="text-danger">*</span> Dose</Form.Label>
            <Form.Control
              type="number"
              placeholder="Dose"
              value={dose}
              onChange={(e) => {
                handleDoseChange(e);
              }}
              isInvalid={!!errors.dose}
              />
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="text-danger">*</span> Tipo
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={tipoId}
              onChange={(e) => handleTipoChange(e)}
              isInvalid={!!errors.tipoMedicamentoId}
              >
              <option value={0}>Selecione</option>
              {listaTipos?.map((m, index) => (
                <option key={index} value={m.id}>
                  {m.identificacao}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
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
          {Object.keys(dadosReceituario).length > 0 && (
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
};

export default AddReceituarios;
