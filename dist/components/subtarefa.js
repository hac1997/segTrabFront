import { atualizarStatusTarefa } from "../task/task.js";
import { salvarSubtarefas } from "../utils/utils.js";
import { confereCheckbox } from "../utils/utilsFiltros.js";
export function criarSubtarefaDiv(subtarefa) {
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
export function gerarEventListenersSubtarefa(subtarefaDiv, subtarefa, todasSubtarefas, tarefa) {
    const checkbox = subtarefaDiv.querySelector("#subtarefa-checkbox-" + subtarefa.id);
    checkbox.addEventListener("change", () => {
        subtarefa.concluida = checkbox.checked;
        salvarSubtarefas(todasSubtarefas);
        const listaSubTarefas = todasSubtarefas.filter(sub => sub.idTarefaMae === tarefa.id);
        const todasConcluidas = confereCheckbox(listaSubTarefas);
        if (tarefa.autoconcluir) {
            atualizarStatusTarefa(tarefa.id, todasConcluidas);
            const idCheck = "checkbox-" + tarefa.id;
            document.getElementById(idCheck).checked = todasConcluidas;
        }
    });
    const btnRemoverSubtarefa = subtarefaDiv.querySelector(".btn-remover-subtarefa");
    btnRemoverSubtarefa.addEventListener("click", () => {
        todasSubtarefas = todasSubtarefas.filter((s) => s.id !== subtarefa.id);
        salvarSubtarefas(todasSubtarefas);
        subtarefaDiv.remove();
    });
}
//# sourceMappingURL=subtarefa.js.map