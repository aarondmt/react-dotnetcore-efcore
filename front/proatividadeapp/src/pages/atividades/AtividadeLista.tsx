import React from "react";
import AtividadeItem from "./AtividadeItem";
import { AtividadeListaProps } from "../../model/atividadesProps";

const AtividadeLista: React.FC<AtividadeListaProps> = ({
  atividades,
  editarAtividade,
  handleConfirmModal,
}: AtividadeListaProps) => {
  return (
    <div className="mt-3">
      {atividades.map((item) => (
        <AtividadeItem
          key={item.id}
          ativ={item}
          editarAtividade={editarAtividade}
          handleConfirmModal={handleConfirmModal}
        />
      ))}
    </div>
  );
};

export default AtividadeLista;
