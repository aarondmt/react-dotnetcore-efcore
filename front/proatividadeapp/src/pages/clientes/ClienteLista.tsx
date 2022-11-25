import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import TitlePage from "../../components/TitlePage";
import { useNavigate } from "react-router-dom";

const clientes = [
  {
    id: 1,
    nome: "Microsoft",
    responsavel: "Otto",
    contato: "123456789",
    situacao: "Ativo",
  },
  {
    id: 2,
    nome: "Amazon",
    responsavel: "William",
    contato: "852147963",
    situacao: "Ativo",
  },
  {
    id: 3,
    nome: "Google",
    responsavel: "Kevin",
    contato: "741852963",
    situacao: "Em Análise",
  },
  {
    id: 4,
    nome: "Facebook",
    responsavel: "Otto",
    contato: "369258147",
    situacao: "Desativado",
  },
  {
    id: 5,
    nome: "Twitter",
    responsavel: "Jack",
    contato: "987654321",
    situacao: "Ativo",
  },
];

const ClienteLista: React.FC = () => {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente)
      .join(" ")
      .toLowerCase()
      .includes(termoBusca.toLocaleLowerCase());
  });

  const novoCliente = () => {
    navigate("/cliente/detalhe");
  };

  return (
    <>
      <TitlePage title="Cliente Lista">
        <Button variant="outline-secondary" onClick={novoCliente}>
          <i className="fa-solid fa-plus me-2"></i>
          Novo Cliente
        </Button>
      </TitlePage>
      <InputGroup className="mb-3 mt-3">
        <InputGroup.Text>Buscar:</InputGroup.Text>
        <Form.Control
          onChange={handleInputChange}
          placeholder="Buscar por nome do cliente"
        />
      </InputGroup>
      <table className="table table-striped table-hover">
        <thead className="table-dark mt-3">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsavel</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.responsavel}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.situacao}</td>
              <td>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/cliente/detalhe/${cliente.id}`)}
                  >
                    <i className="fa-solid fa-user-pen me-2"></i>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger me-2">
                    <i className="fa-solid fa-user-xmark me-2"></i>
                    Desativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClienteLista;
