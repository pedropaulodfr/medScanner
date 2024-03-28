import Table from "react-bootstrap/Table";
import "./TabelaListagem.css";


function TabelaListagem({ headers = [], itens = [] }) {

  return (
    <>
      <Table striped bordered hover responsive="lg" >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ backgroundColor: "#008952", color: "#F2F0D8" }}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {itens.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td style={{ backgroundColor: rowIndex % 2 == 0 ? "#f9f9f9" : "#fffef2" }} key={colIndex}>{item[header.objectValue]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TabelaListagem;
