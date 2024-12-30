import { useState, useEffect } from "react";
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
import Cards from "../components/Cards/Cards";
import Modals from "../components/Modals/Modals";
import TabelaListagem from "../components/TabelaListagem/TabelaListagem";
import { useApi } from "../api/useApi";

export default function Dashboard() {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [dadosCartaoControle, setDadosCartaoControle] = useState([]);
  const [dadosProximoAoRetorno, setDadosProximoAoRetorno] = useState([]);
  const [dadosQntMedicamentos, setDadosQntMedicamentos] = useState([]);
  const [cliqueCard, setCliqueCard] = useState(false);

  // Headers do Card Próximos ao Retorno
  const headersProximoAoRetorno = [
    { value: "Medicamento", objectValue: "medicamento" },
    { value: "Data Retorno", objectValue: "dataRetornoFormatada" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        api.get("/Dashboard/cartaoControle").then((result) => {
          setDadosCartaoControle(result.data);
          setLoading(false);
        });
        
        api.get("/Dashboard/proximoRetorno").then((result) => {
          result.data.map(m => {
            m.dataRetornoFormatada = moment(m.dataRetorno).format("DD/MM/YYYY")
          })
          
          setDadosProximoAoRetorno(result.data);
          setLoading(false);
        });
        
        api.get("/Dashboard/quantidadeMedicamentos").then((result) => {
          setDadosQntMedicamentos(result.data);
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
  const data = []
  dadosCartaoControle.forEach((dr) => {
    const date = moment(dr.dataRetorno).format("YYYY, MM, DD")
    data.push([new Date(date), dr.quantidade]);
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

  console.log(dadosQntMedicamentos);
  const dataQuantidades = [["Medicamento", "Quantidade", { role: "style" }]];

  dadosQntMedicamentos.forEach((x, index) => {
    const style = index % 2 === 0 ? "#4374E0" : "#00C6FF";
    dataQuantidades.push([x.medicamento, x.quantidade, style])
  })


  const [titleModal, setTitleModal] = useState("");
  const [textModal, setTextModal] = useState();

  // Definir a informação mostrada ao clicar em cada card
  const ModalElements = (card) => {
    var _titleModal = "";
    var _textModal;

    switch (card) {
      case 1:
        _titleModal = "Medicamentos próximos ao retorno"
        _textModal = <TabelaListagem headers={headersProximoAoRetorno} itens={dadosProximoAoRetorno} />
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
            <Cards titleHeader="Próximo ao retorno" titleCard={dadosProximoAoRetorno[0]?.quantidade} text="Clique para ver detalhes" textAlign="center" cursorType="pointer" click={setCliqueCard} />
          </Col>
          <Col onClick={() => {ModalElements(2)}}>
            <Cards titleHeader="Quantidade de Medicamentos" titleCard={dadosQntMedicamentos[0]?.quantidadeTotal} textAlign="center" cursorType="pointer" click={setCliqueCard} />
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
