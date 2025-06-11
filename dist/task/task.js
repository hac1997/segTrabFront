import { construirOpcoesSelectListas, esvaziarCamposCriarTarefaMenu } from "../ui/ui.js";
import { togglePopCriarTarefaMenu } from "../ui/uiPop.js";
import { puxarSubtarefas, puxarTarefas } from "../utils/utils.js";
import { formatarData, formatarHora } from "../utils/utilsDataHora.js";
export function atualizarStatusTarefa(tarefaId, concluida) {
    const tarefas = puxarTarefas();
    const dataTermino = new Date();
    const tarefasAtualizadas = tarefas.map(tarefa => {
        if (tarefa.id === tarefaId) {
            return Object.assign(Object.assign({}, tarefa), { concluida, dataConclusao: concluida ? formatarData(dataTermino) : "", horaConclusao: concluida ? formatarHora(dataTermino) : "" });
        }
        return tarefa;
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
}
export function atualizarCheckboxSubtarefas(tarefaid, checked) {
    const subtarefas = puxarSubtarefas();
    subtarefas.forEach(subtarefa => {
        if (subtarefa.idTarefaMae === tarefaid) {
            subtarefa.concluida = checked;
        }
    });
    localStorage.setItem('subtarefas', JSON.stringify(subtarefas));
}
export function abrirPopCriarTarefa() {
    const selectLista = document.getElementById('lista-criar-tarefa-menu');
    selectLista.innerHTML = "";
    construirOpcoesSelectListas(selectLista);
    esvaziarCamposCriarTarefaMenu();
    togglePopCriarTarefaMenu(true);
}
