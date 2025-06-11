import { criarListaContainer } from "../components/listaContainer.js";
import { criarSubtarefaDiv, gerarEventListenersSubtarefa } from "../components/subtarefa.js";
import { criarElementoTarefa, criarTarefaDiv } from "../components/tarefa.js";
import { atualizarCheckboxSubtarefas, atualizarStatusTarefa } from "../task/task.js";
import { Lista, Tarefa } from "../types/types.js";
import { media, puxarCheckedFiltroPrioridade, puxarCheckedFiltroStatus, puxarListas, puxarSubtarefas, puxarTarefas } from "../utils/utils.js";
import { getAnoSemana, parseDataBrasil } from "../utils/utilsDataHora.js";
import { filtrarTarefas, filtroOrdenarDescricao, filtroOrdenarPrioridade, filtroOrdernarTempo, ordenarTarefas } from "../utils/utilsFiltros.js";
import { togglePopEditarTareda, togglePopTarefasAVencer } from "./uiPop.js";


//constroi elementos
export function construirOpcoesSelectListas(divLista: HTMLDivElement): void {
    const listas = puxarListas();

    listas.forEach(lista => {
        const option = criarOpcaoLista(lista.id, lista.nome);
        divLista.appendChild(option);
    });
}

export function criarOpcaoLista(listaId: string, listaNome: string): HTMLOptionElement {
    let option = document.createElement('option');
    option.value = listaId;
    option.textContent = listaNome;
    return option;
}




//preeenchem ou esvaziam elementos
export function carregarValoresPopEditarTarefa(lista: Lista): void {
    (document.getElementById('id-lista-editar') as HTMLInputElement).value = lista.id;
    (document.getElementById('nome-lista-editar') as HTMLInputElement).value = lista.nome;
    (document.getElementById("tipo-ordenacao") as HTMLInputElement).value = lista.tipoOrdenacao;
    (document.getElementById("direcao-ordenacao") as HTMLInputElement).value = lista.ordemOrdenacao;
}

export function preencherCamposEditarTarefa(tarefa: Tarefa): void {
    (document.getElementById('nome-tarefa') as HTMLInputElement).value = tarefa.nome;
    (document.getElementById('descricao-editar') as HTMLInputElement).value = tarefa.descricao;
    (document.getElementById('prioridade') as HTMLInputElement).value = tarefa.prioridade;
    (document.getElementById('data') as HTMLInputElement).value = tarefa.data || '';
    (document.getElementById('hora') as HTMLInputElement).value = tarefa.hora || '';
    (document.getElementById('id-tarefa') as HTMLInputElement).value = tarefa.id;
    (document.getElementById("auto-concluir-tarefa") as HTMLInputElement).checked = tarefa.autoconcluir;
}


export function esvaziarCamposCriarTarefaMenu(): void {
    (document.getElementById('nome-tarefa-menu') as HTMLInputElement).value = '';
    (document.getElementById('descricao-tarefa-menu') as HTMLInputElement).value = '';
    (document.getElementById('prioridade-tarefa-menu') as HTMLSelectElement).selectedIndex = 0;
    (document.getElementById('lista-criar-tarefa-menu') as HTMLSelectElement).selectedIndex = 0;
    (document.getElementById('data-tarefa-menu') as HTMLInputElement).value = '';
    (document.getElementById('hora-tarefa-menu') as HTMLInputElement).value = '';
}

export function carregarSubTarefas(tarefa: Tarefa, subdiv: HTMLDivElement) {
    subdiv.innerHTML = "";

    let todasSubtarefas = puxarSubtarefas();
    const listasubTarefas = todasSubtarefas.filter(
        (subtarefa) => subtarefa.idTarefaMae === tarefa.id
    );

    listasubTarefas.forEach((subtarefa) => {
        const subtarefaDiv = criarSubtarefaDiv(subtarefa);
        gerarEventListenersSubtarefa(subtarefaDiv, subtarefa, todasSubtarefas, tarefa);
        subdiv.appendChild(subtarefaDiv);
    });
}

export function carregarTarefasAVencer(tarefas: Tarefa[], divContainer: HTMLDivElement) {
    divContainer.innerHTML = "";
    tarefas.forEach(tarefa => {
        const tarefaDiv = criarTarefaDiv(tarefa)
        const checkbox = tarefaDiv.querySelector('.checkbox') as HTMLInputElement;
        checkbox.addEventListener('change', () => { atualizarStatusTarefa(tarefa.id, checkbox.checked); });
        tarefaDiv.addEventListener('click', (event) => {
            const target = event.target as HTMLElement | null;
            if (target?.classList.contains('checkbox')) return;
            const selectLista = document.getElementById('lista-editar-tarefa-menu') as HTMLDivElement | null;
            if (selectLista) { construirOpcoesSelectListas(selectLista); }
            abrirPopupEditarTarefa(tarefa.id);
            togglePopTarefasAVencer(false);
        });
        divContainer.appendChild(tarefaDiv);
    });
}

export function carregarTarefas(tarefas: Tarefa[], divContainer: HTMLDivElement) {
    const elementosTarefas = tarefas
        .map(criarElementoTarefa)
        .map((el, i) => aplicarEventosNaTarefa(el, tarefas[i]));
    elementosTarefas.forEach(tarefaEl => {
        divContainer.appendChild(tarefaEl);
    });
}

const aplicarEventosNaTarefa = (tarefaDiv: HTMLDivElement, tarefa: Tarefa) => {
    const checkbox = tarefaDiv.querySelector('.checkbox') as HTMLInputElement;

    checkbox.addEventListener('change', () => {
        atualizarStatusTarefa(tarefa.id, checkbox.checked);
        if (tarefa.autoconcluir === true) {
            atualizarCheckboxSubtarefas(tarefa.id);
        }
    });

    tarefaDiv.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLInputElement && event.target.classList.contains('checkbox'))) {
            abrirPopupEditarTarefa(tarefa.id);
        }
    });

    return tarefaDiv;
};

export function abrirPopupEditarTarefa(tarefaId: string) {
    const tarefa = puxarTarefas().find(t => t.id === tarefaId);
    if (!tarefa) return;
    preencherCamposEditarTarefa(tarefa);
    const selectLista = document.getElementById('lista-editar-tarefa-menu') as HTMLDivElement;

    //pra facilitar a lógica dos event listeners: o tarefid armazena o valor do id no próprio elemento html, assim podemos construir um eventlistener fora do escopo dessa função
    // vide btnPopupEditarTarefaSalvar
    (document.getElementById("id-tarefa-editar") as HTMLInputElement).value = tarefaId;

    selectLista.innerHTML = '';
    puxarListas().forEach(lista => {
        const option = criarOpcaoLista(lista.id, lista.nome);
        if (lista.id === tarefa.listaId) {
            option.selected = true;
        }
        selectLista.appendChild(option);
    });

    const listaSubtarefas = document.getElementById('lista-subtarefas') as HTMLDivElement;
    carregarSubTarefas(tarefa, listaSubtarefas);
    togglePopEditarTareda(true);
}

export function carregarListas(listas: Lista[], div: HTMLDivElement) {
    div.innerHTML = '';

    listas.forEach(lista => {
        const listaContainer = criarListaContainer(lista)[0];
        const listaHeader = criarListaContainer(lista)[1];
        const listaActions = document.createElement('div');
        const tarefasContainer = document.createElement('div');

        tarefasContainer.className = 'tarefas-container';

        let tarefaFiltrada = puxarTarefas().filter(tarefa => tarefa.listaId === lista.id);

        const filtroListaAtivado = lista.tipoOrdenacao;
        if (filtroListaAtivado == "ord-nenhuma") {
            const filtroStatus = puxarCheckedFiltroStatus();
            const filtroPrioridade = puxarCheckedFiltroPrioridade();
            tarefaFiltrada = filtrarTarefas(tarefaFiltrada, filtroStatus, filtroPrioridade);
            (document.getElementById("ordenar-data") as HTMLSelectElement).addEventListener("change", () => filtroOrdernarTempo(tarefaFiltrada));
            (document.getElementById("ordenar-prioridade") as HTMLSelectElement).addEventListener("change", () => filtroOrdenarPrioridade(tarefaFiltrada));
            (document.getElementById("ordenar-desc") as HTMLSelectElement).addEventListener("change", () => filtroOrdenarDescricao(tarefaFiltrada));
        }
        else {
            tarefaFiltrada = ordenarTarefas(tarefaFiltrada, lista.tipoOrdenacao, lista.ordemOrdenacao);
        }
        carregarTarefas(tarefaFiltrada, tarefasContainer);
        listaContainer.appendChild(listaHeader);
        listaContainer.appendChild(listaActions);
        listaContainer.appendChild(tarefasContainer);
        div.appendChild(listaContainer);
    });
}

export function atualizarRelatorios() {
    const tarefas = puxarTarefas();

    const totalTarefas = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida && t.concluida.toString().toLowerCase() === "true");
    const pendentes = tarefas.filter(t => !t.concluida || t.concluida.toString().toLowerCase() !== "true");

    // Médias por período
    let porDia: Record<string, number> = {};
    let porSemana: Record<string, number> = {};
    let porMes: Record<string, number> = {};

    concluidas.forEach(tarefa => {
        const dataConclusao = parseDataBrasil(tarefa.dataConclusao);
        if (dataConclusao) {
            const dia = dataConclusao.toISOString().split('T')[0];
            const semana = getAnoSemana(dataConclusao);
            const mes = dataConclusao.getFullYear() + '-' + (dataConclusao.getMonth() + 1).toString().padStart(2, '0');

            porDia[dia] = (porDia[dia] || 0) + 1;
            porSemana[semana] = (porSemana[semana] || 0) + 1;
            porMes[mes] = (porMes[mes] || 0) + 1;
        }
    });

    const mediaDia = media(Object.values(porDia));
    const mediaSemana = media(Object.values(porSemana));
    const mediaMes = media(Object.values(porMes));

    atualizarCamposRelatorios(totalTarefas.toFixed(0), concluidas.length.toFixed(0), pendentes.length.toFixed(0), mediaDia.toFixed(2), mediaSemana.toFixed(2), mediaMes.toFixed(2))

    const percConcluidas = (concluidas.length / totalTarefas) * 100 || 0;
    const percPendentes = (pendentes.length / totalTarefas) * 100 || 0;
    preencherGraficoPizza(percConcluidas, percPendentes);

}


//atualizar campos dos formulários:

export function atualizarCamposRelatorios(totalTarefas: string, totalTarefasConcluidas: string, totalTarefasPendentes: string, mediaDia: string, mediaSemana: string, mediaMes: string) {
    (document.getElementById('total-tarefas') as HTMLSpanElement).textContent = totalTarefas;
    (document.getElementById('total-concluidas') as HTMLSpanElement).textContent = totalTarefasConcluidas;
    (document.getElementById('total-pendentes') as HTMLSpanElement).textContent = totalTarefasPendentes;
    (document.getElementById('media-dia') as HTMLSpanElement).textContent = mediaDia;
    (document.getElementById('media-semana') as HTMLSpanElement).textContent = mediaSemana;
    (document.getElementById('media-mes') as HTMLSpanElement).textContent = mediaMes;
}



// constrói o gráfico de pizza
export function preencherGraficoPizza(percConcluidas: number, percPendentes: number) {
    const barraTotal = document.querySelector('.barra.total') as HTMLElement;
    const barraConcluidas = document.querySelector('.barra.concluidas') as HTMLElement;
    const barraPendentes = document.querySelector('.barra.pendentes') as HTMLElement;
    const pizza = document.querySelector('.pizza') as HTMLElement;

    if (barraTotal) {
        barraTotal.style.setProperty('--valor', '100%');
    }
    if (barraConcluidas) {
        barraConcluidas.style.setProperty('--valor', `${percConcluidas}%`);
    }
    if (barraPendentes) {
        barraPendentes.style.setProperty('--valor', `${percPendentes}%`);
    }
    if (pizza) {
        pizza.style.background = `conic-gradient(
            #4CAF50 0% ${percConcluidas}%,
            #F44336 ${percConcluidas}% 100%
        )`;
    }
}


