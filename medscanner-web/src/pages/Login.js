import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../helpers/message";
import Loading from "../components/Loading/Loading";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const Login = () => {
  const auth = useState(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      await auth.signin(email, password).then((result) => {
        if (result.statusCode !== 200) {
          console.log(result);
          setLoading(false);
          showMessage(
            "Aviso",
            "Usuário ou senha inválidos. Tente novamente!",
            "error"
          );
        } else {
          setLoading(false);
          navigate("/");
        }
      });
    }
  };

  return (
    <div
      className="login d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {loading && <Loading />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6} md={4}>
            <Form
              className="text-white bg-dark"
              style={{  borderRadius: "15px", padding: "20px" }}
            >
              <h2>Bem Vindo!</h2>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={handleEmailInput}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Senha
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={handlePasswordInput}
                  />
                </Col>
              </Form.Group>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button
                    onClick={handleLogin}
                    style={{
                      backgroundColor: "#6700c8",
                      borderColor: "#3f007b",
                      width: "8vw",
                      margin: "15px",
                    }}
                    size="lg"
                  >
                    Entrar
                  </Button>{" "}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
