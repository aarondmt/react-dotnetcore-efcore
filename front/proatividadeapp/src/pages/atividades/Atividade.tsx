import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../api/atividade";
import AtividadeLista from "./AtividadeLista";
import AtividadeForm from "./AtividadeForm";
import TitlePage from "../../components/TitlePage";
import { IAtividade, Prioridade } from "../../model/atividade";

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: "",
  prioridade: Prioridade.NaoDefinido,
  descricao: "",
};

const Atividade: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);

  const handleAtividadeModa = () => setShow(!show);

  const handleConfirmModal = (id?: number) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((item) => item.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade(atividadeInicial);
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

  const addAtividade = async (ativ: IAtividade) => {
    const response = await api.post("atividade", ativ);
    setAtividades([...atividades, response.data]);
    handleAtividadeModa();
  };

  const novaAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtividadeModa();
  };

  const cancelarAtividade = () => {
    handleAtividadeModa();
    setAtividade(atividadeInicial);
  };

  const deletarAtividade = async (id: number) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter((item) => item.id !== id);
      setAtividades([...atividadesFiltradas]);
    }
  };

  const editarAtividade = (id: number) => {
    const atividade = atividades.filter((item) => item.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModa();
  };

  const atualizarAtividade = async (ativ: IAtividade) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    handleAtividadeModa();
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade(atividadeInicial);
  };

  return (
    <>
      <TitlePage title="Atividades">
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </TitlePage>

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
};

export default Atividade;
