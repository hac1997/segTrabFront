import { atualizarStatusTarefa } from "../task/task";
import { Subtarefa, Tarefa } from "../types/types";
import { salvarSubtarefas } from "../utils/utils";
import { confereCheckbox } from "../utils/utilsFiltros";

export function criarSubtarefaDiv(subtarefa: Subtarefa): HTMLDivElement {
    const subtarefaDiv = document.createElement("div");
    subtarefaDiv.className = "subtarefa-container";

    subtarefaDiv.id = `subtarefa-${subtarefa.id}`;

    subtarefaDiv.innerHTML =
        `
            <div><input type="checkbox" class="checkbox-sub" id="subtarefa-checkbox-${subtarefa.id}" ${subtarefa.concluida ? "checked" : ""}> </div>   
            <p class="texto">${subtarefa.descricao}</p>
            <div> <button type="button" class="btn-remover-subtarefa">Remover</button>
            </div>
            <br>
            `;

    return subtarefaDiv;
}

export function gerarEventListenersSubtarefa(subtarefaDiv: HTMLDivElement, subtarefa: Subtarefa, todasSubtarefas: Subtarefa[], tarefa: Tarefa) {
    const checkbox = subtarefaDiv.querySelector("#subtarefa-checkbox-" + subtarefa.id) as HTMLInputElement;
    checkbox.addEventListener("change", () => {
        subtarefa.concluida = checkbox.checked;
        salvarSubtarefas(todasSubtarefas);
        const listaSubTarefas = todasSubtarefas.filter(sub => sub.idTarefaMae === tarefa.id);
        const todasConcluidas = confereCheckbox(listaSubTarefas);
        if (tarefa.autoconcluir) {
            atualizarStatusTarefa(tarefa.id, todasConcluidas);
            const idCheck = "checkbox-" + tarefa.id;
            (document.getElementById(idCheck) as HTMLInputElement).checked = todasConcluidas
        }
    });

    const btnRemoverSubtarefa = subtarefaDiv.querySelector(".btn-remover-subtarefa") as HTMLButtonElement;

    btnRemoverSubtarefa.addEventListener("click", () => {
        todasSubtarefas = todasSubtarefas.filter((s) => s.id !== subtarefa.id);
        salvarSubtarefas(todasSubtarefas);
        subtarefaDiv.remove();
    });
}