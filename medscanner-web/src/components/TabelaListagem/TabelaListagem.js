import Table from "react-bootstrap/Table";
import "./TabelaListagem.css";


function TabelaListagem({ headers = [], itens = [] }) {

  return (
    <>
      <Table striped bordered hover >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ backgroundColor: "#F25D07", color: "#F2F0D8" }}>{header.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {itens.map((item, rowIndex) => (
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
