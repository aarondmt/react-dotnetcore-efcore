import React from "react";
import { Prioridade } from "../../model/atividade";
import { AtividadeItemProps } from "../../model/atividadesProps";

const AtividadeItem: React.FC<AtividadeItemProps> = ({
  ativ,
  editarAtividade,
  handleConfirmModal,
}: AtividadeItemProps) => {
  function prioridadeLabel(param: string) {
    switch (param) {
      case Prioridade.Baixa:
      case Prioridade.Normal:
      case Prioridade.Alta:
        return param;
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param: string, icon: boolean) {
    switch (param) {
      case Prioridade.Baixa:
        return icon ? "smile" : "success";
      case Prioridade.Normal:
        return icon ? "meh" : "dark";
      case Prioridade.Alta:
        return icon ? "frown" : "warning";
      default:
        return icon ? "sad-tear" : "danger";
    }
  }

  return (
    <div
      className={
        "card mb-2 shadow-sm border-" + prioridadeStyle(ativ.prioridade, false)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge text-bg-secondary me-1">{ativ.id}</span>-{" "}
            {ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span
              className={"ms-1 text-" + prioridadeStyle(ativ.prioridade, false)}
            >
              <i
                className={
                  "me-1 fa-regular fa-face-" +
                  prioridadeStyle(ativ.prioridade, true)
                }
              ></i>
              {prioridadeLabel(ativ.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">{ativ.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => editarAtividade(ativ.id)}
          >
            <i className="fa-solid fa-pencil me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleConfirmModal(ativ.id)}
          >
            <i className="fa-solid fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtividadeItem;
