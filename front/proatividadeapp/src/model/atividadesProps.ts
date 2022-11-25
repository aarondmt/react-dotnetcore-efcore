import { IAtividade } from "./atividade";

export interface AtividadeListaProps {
    atividades: IAtividade[];
    editarAtividade: (id: number) => void;
    handleConfirmModal: (id: number) => void;
}

export interface AtividadeItemProps {
    ativ: IAtividade;
    editarAtividade: (id: number) => void;
    handleConfirmModal: (id: number) => void;
}

export interface AtividadeFormProps {
    atividadeSelecionada: IAtividade;
    atualizarAtividade: (atividade: IAtividade) => void;
    addAtividade: (atividade: IAtividade) => void;
    cancelarAtividade: () => void;
}