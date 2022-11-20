import React from "react";
import Atividade from "./Atividade";

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
      {props.atividades.map((item) => (
        <Atividade
          key={item.id}
          item={item}
          deletarAtividade={props.deletarAtividade}
          editarAtividade={props.editarAtividade}
        />
      ))}
    </div>
  );
}