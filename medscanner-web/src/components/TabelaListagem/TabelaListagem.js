import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Loading from "../Loading/Loading";
import { showMessage } from "../../helpers/message";

function TabelaListagem({ headers = [] }) {
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/card");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setDadosMedicamentos(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        showMessage(
          "Aviso",
          "Erro ao buscar dados: " + error,
          "error",
          null
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Table striped>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dadosMedicamentos.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{item[header.objectValue]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TabelaListagem;
