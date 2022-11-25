import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import TitlePage from "../../components/TitlePage";
import api from "../../api/atividade";
import internal from "stream";

type atividadeType = {
  dataConclusao: string | null;
  dataCriacao: string;
  descricao: string;
  id: number;
  prioridade: string;
  titulo: string;
};

const Home: React.FC = () => {
  const [atividades, setAtividades] = useState<atividadeType[]>([]);

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
  };

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();

      console.log(todasAtividades);

      if (todasAtividades) setAtividades(todasAtividades);
    };

    getAtividades();
  }, []);

  return (
    <>
      <TitlePage title="Dashboard" />
      <div className="mt-3">
        <Row>
          <Col>
            <Card border="success">
              <Card.Header>Clientes atuais</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">25</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="secondary">
              <Card.Header>Atividades totais</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">{atividades.length}</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="warning">
              <Card.Header>Atividades Urgentes</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">
                    {atividades.length > 0
                      ? atividades.filter((ativ) => ativ.prioridade === "Alta")
                          .length
                      : 0}
                  </h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="danger">
              <Card.Header>Atividades Atrasadas</Card.Header>
              <Card.Body>
                <Card.Title>
                  <h1 className="text-center">2</h1>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
