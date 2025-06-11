import { abrirPopCriarTarefa } from "./task/task.js";
import { Lista, Prioridade, Tarefa } from "./types/types.js";
import { atualizarRelatorios, carregarListas, carregarTarefas, carregarTarefasAVencer } from "./ui/ui.js";
import { toggleBotaoAlertaTarefaAVencer, togglePopBuscaJanela, togglePopCriarListaMenu, togglePopCriarTarefaMenu, togglePopEditarLista, togglePopEditarTareda, togglePopRelatorio, togglePopTarefasAVencer } from "./ui/uiPop.js";
import { excluirLista, excluirTarefa, puxarListas, puxarTarefas, puxarTarefasVencer, salvarLista, salvarSubtarefa, salvarTarefa } from "./utils/utils.js";
import { filtrarListasPorNome, filtroBuscar } from "./utils/utilsFiltros.js";


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

    const inputBusca = document.getElementById('string-busca') as HTMLInputElement;
    const divBuscar = document.getElementById('tarefas-buscar') as HTMLDivElement;

    const btnCriarListaMenu = document.getElementById('btn-popup-lista-menu-criar') as HTMLButtonElement;
    const btnAbrirPopCriarListaMenu = document.getElementById('btn-abrir-pop-criar-lista-menu') as HTMLButtonElement;
    const btnCancelarPopupListaMenu = document.getElementById('btn-popup-lista-menu-cancelar') as HTMLButtonElement;
    const btnAbrirPopup = document.getElementById('btn-abrir-pop-criar-tarefa-menu') as HTMLButtonElement;
    const btnSalvarTarefaMenu = document.getElementById('btn-criar-tarefa-menu-salvar') as HTMLButtonElement;
    const btnCancelarTarefaMenu = document.getElementById('btn-criar-tarefa-menu-cancelar') as HTMLButtonElement;
    const btnAbrirPopBuscar = document.getElementById('btn-abrir-buscar') as HTMLButtonElement;
    const btnFecharPopBuscar = document.getElementById('btn-sair-buscar') as HTMLButtonElement;
    const btnAbrirPopTarefasAtrasadas = document.getElementById('botao-flutuante-alerta') as HTMLButtonElement;
    const btnFecharPopTarefasAtrasadas = document.getElementById('btn-sair-tarefas-atrasadas') as HTMLButtonElement;
    const btnAddSubtarefa = document.getElementById('btn-add-subtarefa') as HTMLButtonElement;
    const btnAbrirPopGrafico = document.getElementById("btn-gerar-grafico") as HTMLButtonElement;
    const btnFecharRelatorio = document.getElementById("btn-fechar-relatorios") as HTMLButtonElement;
    const btnPopupEditarTarefaSair = document.getElementById('btn-popup-editar-tarefa-sair') as HTMLButtonElement;
    const btnEditarLista = document.getElementById('btn-editar-lista') as HTMLButtonElement;
    const btnExcluirEditarLista = document.getElementById('btn-excluir-lista') as HTMLButtonElement;
    const btnCancelarEditarLista = document.getElementById('btn-cancelar-editar-lista') as HTMLButtonElement;
    const btnPopupEditarTarefaSalvar = document.getElementById('btn-popup-editar-tarefa-editar') as HTMLButtonElement;
    const btnPopupEditarTarefaExcluir = document.getElementById('btn-popup-editar-tarefa-excluir') as HTMLButtonElement;

    let nomeLista = (document.getElementById('nome-lista') as HTMLInputElement).value;

    btnCriarListaMenu.addEventListener('click', () => {

        salvarLista(nomeLista);
        togglePopCriarListaMenu(false);
        nomeLista = '';
    });

    btnAbrirPopCriarListaMenu.addEventListener('click', () => {
        (document.getElementById('nome-lista') as HTMLInputElement).value = '';
        togglePopCriarTarefaMenu(false);
        togglePopCriarListaMenu(true)
    });

    btnCancelarPopupListaMenu.addEventListener('click', () => {
        togglePopCriarListaMenu(false)
    });

    //pop criar tarefa
    btnAbrirPopup.addEventListener('click', () => {
        abrirPopCriarTarefa();
    });

    btnSalvarTarefaMenu.addEventListener('click', () => {
        const nomeTarefa = (document.getElementById('nome-tarefa-menu') as HTMLInputElement).value;
        const descricao = (document.getElementById('descricao-tarefa-menu') as HTMLInputElement).value;
        const prioridade = (document.getElementById('prioridade-tarefa-menu') as HTMLInputElement).value as Prioridade;
        const listaId = (document.getElementById('lista-criar-tarefa-menu') as HTMLInputElement).value;
        const data = (document.getElementById('data-tarefa-menu') as HTMLInputElement).value;
        const hora = (document.getElementById('hora-tarefa-menu') as HTMLInputElement).value;

        salvarTarefa("", nomeTarefa, descricao, prioridade, listaId, data, hora);

    });

    btnCancelarTarefaMenu.addEventListener('click', () => {
        togglePopCriarTarefaMenu(false)
    });

    // pop buscar tarefa

    btnAbrirPopBuscar.addEventListener('click', () => {
        const stringBusca = inputBusca.value.trim().toLowerCase();
        const tarefas = puxarTarefas();
        divBuscar.innerHTML = "";
        const tarefasFiltradas = filtroBuscar(tarefas, stringBusca);
        carregarTarefas(tarefasFiltradas, divBuscar);
        togglePopBuscaJanela(true);
    });

    btnFecharPopBuscar.addEventListener('click', () => {
        togglePopBuscaJanela(false)
    });

    //carrega o botão de alerta de tarefas pra vencer

    const tarefasVencer = puxarTarefasVencer(1);

    if (tarefasVencer.length > 0) {
        toggleBotaoAlertaTarefaAVencer(true)
    }

    btnAbrirPopTarefasAtrasadas.addEventListener('click', () => {
        divBuscar.innerHTML = "";
        const divTarefasVencer = document.getElementById('tarefas-a-vencer') as HTMLDivElement;
        carregarTarefasAVencer(tarefasVencer, divTarefasVencer);
        togglePopTarefasAVencer(true)
    });

    btnFecharPopTarefasAtrasadas.addEventListener('click', () => {
        togglePopTarefasAVencer(false)
    });

    btnPopupEditarTarefaSalvar.onclick = () => {
        const tarefaId = (document.getElementById('id-tarefa-editar') as HTMLInputElement).value;
        const novoNome = (document.getElementById('nome-tarefa') as HTMLInputElement).value;
        const novaDescricao = (document.getElementById('descricao-editar') as HTMLInputElement).value;
        const novaPrioridade = (document.getElementById('prioridade') as HTMLInputElement).value as Prioridade;
        const novaData = (document.getElementById('data') as HTMLInputElement).value;
        const novaHora = (document.getElementById('hora') as HTMLInputElement).value;
        const novaListaId = (document.getElementById('lista-editar-tarefa-menu') as HTMLInputElement).value;
        salvarTarefa(tarefaId, novoNome, novaDescricao, novaPrioridade, novaListaId, novaData, novaHora)
    };

    btnPopupEditarTarefaExcluir.onclick = () => {
        const tarefaId = (document.getElementById('id-tarefa-editar') as HTMLInputElement).value;
        excluirTarefa(tarefaId);
        location.reload();
        togglePopEditarTareda(false)
    };

    btnAddSubtarefa.addEventListener("click", () => {
        const idTarefaInput = document.getElementById('id-tarefa') as HTMLInputElement;
        const idTarefa = idTarefaInput.value;
        const tarefa = puxarTarefas().find(tarefa => tarefa.id == idTarefa) as Tarefa;
        const descInput = document.getElementById('subtarefa-descricao') as HTMLInputElement;
        const desc = descInput.value;

        salvarSubtarefa(tarefa, desc);
        descInput.value = "";
    });




    btnEditarLista.onclick = () => {
        const listaId = (document.getElementById('id-lista-editar') as HTMLInputElement).value;
        const listas = puxarListas();
        const lista = listas.find(l => l.id === listaId) as Lista;
        const index = listas.findIndex(l => l.id === listaId);
        const novoNome = (document.getElementById('nome-lista-editar') as HTMLInputElement).value;
        const tipoOrdenacao = (document.getElementById("tipo-ordenacao") as HTMLInputElement).value;
        const ordemOrdenacao = (document.getElementById("direcao-ordenacao") as HTMLInputElement).value;

        lista.nome = novoNome;
        lista.tipoOrdenacao = tipoOrdenacao;
        lista.ordemOrdenacao = ordemOrdenacao;
        listas[index] = lista;
        localStorage.setItem('listas', JSON.stringify(listas));

        togglePopEditarLista(false);
        const quadroTarefas = document.querySelector('.quadro-tarefas') as HTMLDivElement;
        carregarListas(listas, quadroTarefas)
    };

    // Botão "excluir"


    btnExcluirEditarLista.onclick = () => {
        const listaId = (document.getElementById('id-lista-editar') as HTMLInputElement).value;
        excluirLista(listaId);
        togglePopEditarLista(false);
    };

    // Botão "cancelar"
    btnCancelarEditarLista.onclick = () => {
        togglePopEditarLista(false);
    };


    //abre o pop de gráficos
    btnAbrirPopGrafico.addEventListener("click", () => {
        atualizarRelatorios(); // Chama para atualizar os valores ao abrir
        togglePopRelatorio(true);
    })

    btnFecharRelatorio.addEventListener("click", () => {
        togglePopRelatorio(false)
    })

    btnPopupEditarTarefaSair.onclick = () => {
        togglePopEditarTareda(false)
    };

}

document.addEventListener('DOMContentLoaded', () => main())
