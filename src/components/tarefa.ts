import { Tarefa } from "../types/types.js";
import { dataExpirada, tempoRestanteParaVencer } from "../utils/utilsDataHora.js";

export function criarTarefaDiv(tarefa: Tarefa): HTMLDivElement {
    const tarefaDiv = document.createElement('div');
    tarefaDiv.className = 'tarefa';
    tarefaDiv.classList.add('vencer');
    tarefaDiv.id = tarefa.id;
    tarefaDiv.innerHTML = `
            <input type="checkbox" class="checkbox" ${tarefa.concluida ? 'checked' : ''}>
            <p>${tempoRestanteParaVencer(tarefa)} </p>
        `;
    return tarefaDiv
}

export function criarElementoTarefa(tarefa: Tarefa) {
    const tarefaDiv = document.createElement('div');
    tarefaDiv.className = 'tarefa';
    tarefaDiv.id = tarefa.id;
    const prioridadeClasses = {
        'Alta': "alta-prioridade",
        'Moderada': "moderada-prioridade",
        'Leve': "leve-prioridade"
    };
    const prioridadeClasse = prioridadeClasses[tarefa.prioridade];
    if (prioridadeClasse) tarefaDiv.classList.add(prioridadeClasse);
    if (dataExpirada(tarefa.data, tarefa.hora)) {
        tarefaDiv.classList.add('expirada');
    }
    const tarefaExpiradaMsg = dataExpirada(tarefa.data, tarefa.hora) && !tarefa.concluida ? 'Tarefa Expirada!' : '';

    tarefaDiv.innerHTML = `
        <input type="checkbox" class="checkbox" ${tarefa.concluida ? 'checked' : ''} id="checkbox-${tarefa.id}">
        <p>${tarefa.nome}</p>
        <p>${tarefaExpiradaMsg}</p>
    `;
    return tarefaDiv;
};