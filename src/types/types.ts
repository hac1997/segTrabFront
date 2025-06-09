import { gerarIdUnico } from "../utils/utils";

// export type TipoOrdenacao = "ord-prioridade" | "ord-Nome" | "ord-data-conclusao" | "ord-nenhuma"
// export type OrdemOrdenacao = "ord-asc" | "ord-desc" 
// export type Prioridade = "Alta" | "Moderada" | "Leve" 


export type Prioridade = 'Alta' | 'Moderada' | 'Leve';

export interface Lista {
    id: string;
    nome: string;
    tarefas: string[];
    tipoOrdenacao: string;
    ordemOrdenacao: string;
}

export interface Subtarefa {
    id: string;
    descricao: string;
    concluida: boolean;
    idTarefaMae: string;
}

export interface Tarefa {
    id: string;
    nome: string;
    descricao: string;
    prioridade: Prioridade;
    listaId: string;
    data: string; // dd/mm/aaaa
    hora: string; // hh:mm
    dataConclusao: string; // dd/mm/aaaa
    horaConclusao: string; // hh:mm
    concluida: boolean;
    autoconcluir: boolean;
}

//construtores vulgares (sem classe)

export function construirLista(id: string, nome: string): Lista {

    const novaLista = {
        id: id,
        nome: nome,
        tarefas: [],
        tipoOrdenacao: "",
        ordemOrdenacao: "",
    };
    return novaLista;

}

export function construirTarefa(idTarefa: string, nomeTarefa: string, descricao: string, prioridade: Prioridade, listaId: string, data: string, hora: string): Tarefa {
    let tarefaSaida = {
        id: idTarefa,
        nome: nomeTarefa,
        descricao,
        prioridade,
        listaId,
        data,
        hora,
        concluida: false,
        dataConclusao: "",
        horaConclusao: "",
        autoconcluir:false
    };
    return tarefaSaida;
}

export function construirSubtarefa(descricao: string, idTarefaMae: string): Subtarefa {
    let subtarefaSaida =
    {
        id: gerarIdUnico(),
        descricao: descricao,
        concluida: false,
        idTarefaMae: idTarefaMae,
    };
    return subtarefaSaida;
}

