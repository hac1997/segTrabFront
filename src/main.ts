import { abrirPopCriarTarefa } from "./task/task";
import { carregarListas } from "./ui/ui";
import { togglePopCriarListaMenu, togglePopRelatorio } from "./ui/uiPop";
import { puxarListas } from "./utils/utils";
import { filtrarListasPorNome } from "./utils/utilsFiltros";


function main() {
    const quadroTarefas = document.querySelector('.quadro-tarefas') as HTMLDivElement;
    const listas = puxarListas();

    carregarListas(listas, quadroTarefas);
    // filtros e ordenacao menu lateral
    const filtroListasContainer = document.getElementById('filtro-listas');
    listas.forEach(lista => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" class="filtro-lista-checkbox" value="${lista.id}">
            ${lista.nome}
            <br>
        `;
        (filtroListasContainer as HTMLDivElement).appendChild(label);
    });

    document.querySelectorAll('.filtro-lista-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const listasFiltradas = filtrarListasPorNome(listas);
            carregarListas(listasFiltradas, quadroTarefas);
        });
    });

    const checkboxesFiltroRapido = document.querySelectorAll('.menu-lateral-div input[type="checkbox"]');
    checkboxesFiltroRapido.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const listasFiltradas = filtrarListasPorNome(listas);
            carregarListas(listasFiltradas, quadroTarefas);
        });
    });

    (document.getElementById('ordenar-data') as HTMLSelectElement).addEventListener('change', () => {
        const container = document.querySelector('.quadro-tarefas') as HTMLDivElement;
        const listasFiltradas = filtrarListasPorNome(listas);
        carregarListas(listasFiltradas, container);
    });

    document.addEventListener("keydown", function (event) {
        //nova tarefa
        if (event.shiftKey && (event.key === "t" || event.key === "T")) {
            event.preventDefault();
            abrirPopCriarTarefa();
        }
        //buscar tarefa
        if (event.shiftKey && (event.key === "f" || event.key === "F")) {
            event.preventDefault();
            const campoBusca = document.getElementById("string-busca") as HTMLInputElement;

            if (campoBusca) {
                campoBusca.focus();
                campoBusca.select();
            }
        }
        //nova lista
        if (event.shiftKey && (event.key === "l" || event.key === "L")) {
            event.preventDefault();
            togglePopCriarListaMenu(true)
        }
        //abrir gráfico
        if (event.shiftKey && (event.key === "g" || event.key === "G")) {
            event.preventDefault();
            togglePopRelatorio(true)
        }
    });
}

document.addEventListener('DOMContentLoaded', () => main())
