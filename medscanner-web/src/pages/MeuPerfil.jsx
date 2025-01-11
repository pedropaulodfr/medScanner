import { useState, useEffect } from "react";
import moment from "moment";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

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
import { getSessionCookie } from "../helpers/cookies";

export default function MeuPerfil() {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        api.get(`/Usuarios/get/${getSessionCookie().usuario_Id}`).then((result) => {
            setUsuario(result.data);
            setLoading(false);
          });
      } catch (error) {
        showMessage("Aviso", "Erro ao buscar dados: " + error, "error", null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(usuario);
  

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-md-center">
        <Col className="d-flex justify-content-center">
          <h1 className="title-page">Meu Perfil</h1>
        </Col>
      </Row>
      <Row className="text-black mb-4 shadow p-3 mb-5 bg-white rounded" style={{ borderRadius: "15px", padding: "20px" }} >
        <Col className="d-flex justify-content-center">
          <div>
            <div className="d-flex justify-content-center mb-2">
              <span className="fs-2 fw-semibold">
                {usuario?.nome}
              </span>
            </div>
            <Image src={`data:image/jpg;base64, ${usuario?.imagemPerfil}`} roundedCircle />
          </div>
        </Col>
      </Row>
      <Row className="text-black mb-4 shadow p-3 mb-5 bg-white rounded" style={{ borderRadius: "15px", padding: "20px" }} >
        <Col lg="12" sm="12">
            <span className="fw-semibold">Perfil:</span> <span>{usuario?.perfil}</span>
        </Col>
        <Col lg="4" sm="12">
            <span className="fw-semibold">Nome:</span> <span>{usuario?.nome}</span>
        </Col>
        <Col lg="4" sm="12">
            <span className="fw-semibold">E-mail:</span> <span>{usuario?.email}</span>
        </Col>
        <Col lg="4" sm="12">
            <span className="fw-semibold">Código Cadastro:</span> <span>{usuario?.codigoCadastro}</span>
        </Col>
        <Col lg="4" sm="12">
            <span className="fw-semibold">Status:</span> <span>{usuario?.ativo}</span>
        </Col>
      </Row>
    </Container>
  );
}
