import React from "react";

export default function Atividade(props) {
  function prioridadeLabel(param) {
    switch (parseInt(param)) {
      case 1:
        return "Baixa";
      case 2:
        return "Normal";
      case 3:
        return "Alta";
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param, icon) {
    switch (parseInt(param)) {
      case 1:
        return icon ? "smile" : "success";
      case 2:
        return icon ? "meh" : "dark";
      case 3:
        return icon ? "frown" : "warning";
      default:
        return icon ? "sad-tear" : "danger";
    }
  }

  return (
    <div
      className={
        "card mb-2 shadow-sm border-" + prioridadeStyle(props.item.prioridade)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge text-bg-secondary me-1">
              {props.item.id}
            </span>
            - {props.item.titulo}
          </h5>
          <h6>
            Prioridade:
            <span
              className={"ms-1 text-" + prioridadeStyle(props.item.prioridade)}
            >
              <i
                className={
                  "me-1 fa-regular fa-face-" +
                  prioridadeStyle(props.item.prioridade, true)
                }
              ></i>
              {prioridadeLabel(props.item.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">{props.item.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => props.editarAtividade(props.item.id)}
          >
            <i className="fa-solid fa-pencil me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => props.deletarAtividade(props.item.id)}
          >
            <i className="fa-solid fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
