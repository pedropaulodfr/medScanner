import React from "react";
import Logotipo from "../assets/logotipo.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const handleCard = () => {
    window.location.href = "/card";
  }

  return (
    <Container>
        <h1>Dashboard</h1>
    </Container>
  );
}
