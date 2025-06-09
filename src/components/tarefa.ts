import { Tarefa } from "../types/types";
import { tempoRestanteParaVencer } from "../utils/utilsDataHora";

export function criarTarefaDiv(tarefa:Tarefa):HTMLDivElement{
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