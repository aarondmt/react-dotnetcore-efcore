import { useEffect, useState } from "react";

const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.atividadeSelecionada.id !== 0) {
      setAtividade(props.atividadeSelecionada);
    }
  }, [props.atividadeSelecionada]);

  function atividadeAtual() {
    if (props.atividadeSelecionada.id !== 0) {
      return props.atividadeSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade();

    setAtividade(atividadeInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.atividadeSelecionada.id !== 0) {
      props.atualizarAtividade(atividade);
    } else {
      props.addAtividade(atividade);
    }

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
            onChange={inputTextHandler}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            className="form-select"
            name="prioridade"
            value={atividade.prioridade}
            onChange={inputTextHandler}
          >
            <option defaultValue="0">Selecione...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descriação</label>
          <textarea
            id="descricao"
            type="text"
            className="form-control"
            name="descricao"
            value={atividade.descricao}
            onChange={inputTextHandler}
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
}
