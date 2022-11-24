import React from "react";
import AtividadeItem from "./AtividadeItem";

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
      {props.atividades.map((item) => (
        <AtividadeItem
          key={item.id}
          item={item}
          handleConfirmModal={props.handleConfirmModal}
          editarAtividade={props.editarAtividade}
        />
      ))}
    </div>
  );
}
