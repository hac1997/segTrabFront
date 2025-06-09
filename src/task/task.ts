import { Tarefa } from "../types/types";
import { construirOpcoesSelectListas, esvaziarCamposCriarTarefaMenu } from "../ui/ui";
import { togglePopCriarTarefaMenu } from "../ui/uiPop";
import { puxarSubtarefas, puxarTarefas } from "../utils/utils";
import { formatarData, formatarHora } from "../utils/utilsDataHora";


export function atualizarStatusTarefa(tarefaId: string, concluida: boolean): void {
    const tarefas: Tarefa[] = puxarTarefas();
    const dataTermino = new Date();

    const tarefasAtualizadas = tarefas.map(tarefa => {
        if (tarefa.id === tarefaId) {
            return {
                ...tarefa,
                concluida,
                dataConclusao: concluida ? formatarData(dataTermino) : "",
                horaConclusao: concluida ? formatarHora(dataTermino) : ""
            };
        }
        return tarefa;
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
}


export function atualizarCheckboxSubtarefas(tarefaid: string, checked: boolean) {
    const subtarefas = puxarSubtarefas();

    subtarefas.forEach(subtarefa => {
        if (subtarefa.idTarefaMae === tarefaid) {
            subtarefa.concluida = true;
        }
    });
    localStorage.setItem('subtarefas', JSON.stringify(subtarefas));
}

export function abrirPopCriarTarefa() {
    const selectLista = document.getElementById('lista-criar-tarefa-menu') as HTMLDivElement;
    selectLista.innerHTML = "";
    construirOpcoesSelectListas(selectLista);
    esvaziarCamposCriarTarefaMenu();
    togglePopCriarTarefaMenu(true)
}