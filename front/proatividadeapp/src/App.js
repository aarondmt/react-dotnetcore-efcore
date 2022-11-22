import { useEffect, useState } from "react";
import "./App.css";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import api from "./api/atividade";
import { Button, Modal } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  const handleAtividadeModa = () => setShow(!show);

  const handleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((item) => item.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade({ id: 0 });
    }
    setShowConfirmModal(!showConfirmModal);
  };

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
  };

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();

      if (todasAtividades) setAtividades(todasAtividades);
    };

    getAtividades();
  }, []);

  const addAtividade = async (ativ) => {
    const response = await api.post("atividade", ativ);
    setAtividades([...atividades, response.data]);
    handleAtividadeModa();
  };

  const novaAtividade = () => {
    setAtividade({ id: 0 });
    handleAtividadeModa();
  };

  const cancelarAtividade = () => {
    handleAtividadeModa();
    setAtividade({ id: 0 });
  };

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter((item) => item.id !== id);
      setAtividades([...atividadesFiltradas]);
    }
  };

  const editarAtividade = (id) => {
    const atividade = atividades.filter((item) => item.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModa();
  };

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    handleAtividadeModa();
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade({ id: 0 });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">Atividades</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        handleConfirmModal={handleConfirmModal}
        editarAtividade={editarAtividade}
      />

      <Modal show={show} onHide={handleAtividadeModa}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            atividades={atividades}
            atividadeSelecionada={atividade}
            atualizarAtividade={atualizarAtividade}
            cancelarAtividade={cancelarAtividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={showConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que excluir a Atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="btn btn-outline-success me-2"
            onClick={() => deletarAtividade(atividade.id)}
          >
            <i className="fa-solid fa-check me-2"></i> Sim
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => handleConfirmModal(0)}
          >
            <i className="fa-solid fa-xmark me-2"></i> Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
