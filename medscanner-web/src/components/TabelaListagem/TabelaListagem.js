import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Loading from "../Loading/Loading";
import { showMessage } from "../../helpers/message";
import "./TabelaListagem.css";
import axios from "axios";


function TabelaListagem({ headers = [] }) {
  const [dadosMedicamentos, setDadosMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = axios.create({
    baseURL: "http://localhost:8000"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await db.get('/card').then((result) => {
          setDadosMedicamentos(result.data);
          setLoading(false);
        })
      }
      catch (error) {
        console.error("Erro ao buscar dados:", error);
        showMessage(
          "Aviso",
          "Erro ao buscar dados: " + error,
          "error",
          null
        );
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  console.log(headers);

  return (
    <>
      {loading && <Loading />}
      <Table striped bordered hover >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ backgroundColor: "#F25D07", color: "#F2F0D8" }}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dadosMedicamentos.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td style={{ backgroundColor: rowIndex % 2 == 0 ? "#EBEBF0" : "#F2F0D8" }} key={colIndex}>{item[header.objectValue]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TabelaListagem;
