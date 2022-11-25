import { useEffect, useState } from "react";
import { IAtividade, Prioridade } from "../../model/atividade";
import { AtividadeFormProps } from "../../model/atividadesProps";

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: "",
  prioridade: Prioridade.NaoDefinido,
  descricao: "",
};

const AtividadeForm: React.FC<AtividadeFormProps> = ({
  atividadeSelecionada,
  atualizarAtividade,
  addAtividade,
  cancelarAtividade,
}: AtividadeFormProps) => {
  const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual());

  useEffect(() => {
    if (atividadeSelecionada.id !== 0) {
      setAtividade(atividadeSelecionada);
    }
  }, [atividadeSelecionada]);

  function atividadeAtual(): IAtividade {
    if (atividadeSelecionada.id !== 0) {
      return atividadeSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const handleValue = (e: any) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (atividadeSelecionada.id !== 0) {
      atualizarAtividade(atividade);
    } else {
      addAtividade(atividade);
    }

    setAtividade(atividadeInicial);
  };

  const handleCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    cancelarAtividade();

    setAtividade(atividadeInicial);
  };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            id="titulo"
            type="text"
            className="form-control"
            name="titulo"
            value={atividade.titulo}
            onChange={handleValue}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            className="form-select"
            name="prioridade"
            value={atividade.prioridade}
            onChange={handleValue}
          >
            {Object.keys(Prioridade).map((pri) =>
              pri === "NaoDefinido" ? (
                <option value={pri}>Selecione...</option>
              ) : (
                <option value={pri}>{pri}</option>
              )
            )}
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descriação</label>
          <textarea
            id="descricao"
            className="form-control"
            name="descricao"
            value={atividade.descricao}
            onChange={handleValue}
          ></textarea>
          <hr />
        </div>
        <div className="col-12 mt-0">
          <button className="btn btn-outline-success" type="submit">
            <i className="fa-solid fa-plus me-2"></i>Salvar
          </button>
          {atividade.id !== 0 ? (
            <button
              className="btn btn-outline-warning ms-2"
              onClick={handleCancelar}
            >
              <i className="fa-solid fa-plus me-2"></i>Cancelar
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
};

export default AtividadeForm;
