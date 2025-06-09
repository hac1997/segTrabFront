import { Lista, Subtarefa, Tarefa } from "../types/types";
import { dataExpirada, parseDataHora } from "./utilsDataHora";

//validadores

function ehVencida(tarefa: Tarefa): boolean {
    return dataExpirada(tarefa.data, tarefa.hora) && !tarefa.concluida;
};

function ehConcluida(tarefa: Tarefa): boolean {
    return tarefa.concluida;
};

function ehPendente(tarefa: Tarefa): boolean {
    return !tarefa.concluida && !ehVencida(tarefa);
};

function statusBateComFiltro(tarefa: Tarefa, filtroStatus:string): boolean {
    const vencida = ehVencida(tarefa);
    const pendente = ehPendente(tarefa);
    const concluida = ehConcluida(tarefa);

    return (
        (filtroStatus.pendente && pendente) ||
        (filtroStatus.concluida && concluida) ||
        (filtroStatus.vencido && vencida)
    );
};

function prioridadeBateComFiltro(tarefa: Tarefa, filtroPrioridade): boolean {
    return (
        (filtroPrioridade.baixa && tarefa.prioridade === 'Leve') ||
        (filtroPrioridade.media && tarefa.prioridade === 'Moderada') ||
        (filtroPrioridade.alta && tarefa.prioridade === 'Alta')
    );
};

export function confereCheckbox(subtarefas: Subtarefa[]) {
    let todasConcluidas = true;
    subtarefas.forEach(sub => {
        todasConcluidas = todasConcluidas && sub.concluida;
    });
    return todasConcluidas;
}

//filtros

export function filtrarTarefas(tarefas: Tarefa[], filtroStatus, filtroPrioridade) {
    const tarefasFiltradasPorStatus = tarefas.filter((tarefa) =>
        filtroStatus.pendente || filtroStatus.concluida || filtroStatus.vencido
            ? statusBateComFiltro(tarefa, filtroStatus)
            : true
    );

    const tarefasFiltradasPorPrioridade = tarefasFiltradasPorStatus.filter(
        (tarefa) =>
            filtroPrioridade.baixa || filtroPrioridade.media || filtroPrioridade.alta
                ? prioridadeBateComFiltro(tarefa, filtroPrioridade)
                : true
    );

    return tarefasFiltradasPorPrioridade;
};


// filtro de busca. 
export function filtroBuscar(tarefas: Tarefa[], stringBusca: string) {
    const busca = stringBusca.trim().toLowerCase();

    return tarefas.filter(tarefa => {
        const nomeMatch = tarefa.nome.toLowerCase().includes(busca);
        const descricaoMatch = tarefa.descricao.toLowerCase().includes(busca);
        const dataMatch = tarefa.data.toLowerCase().includes(busca);

        return nomeMatch || descricaoMatch || dataMatch;
    });
}

export function filtrarListasPorNome(listas: Lista[]) {
    const listasSelecionadas = Array.from(document.querySelectorAll('.filtro-lista-checkbox:checked'))
        .map(cb => cb.value);

    const listafiltrada = listas.filter(lista => listasSelecionadas.length === 0 || listasSelecionadas.includes(lista.id));

    return listafiltrada;
}

// funções para ordernamento

export function filtroOrdenarDescricao(tarefas: Tarefa[]) {
    const criterioDesc = document.getElementById('ordenar-desc').value;

    if (criterioDesc === 'desc-alfabetico') {
        tarefas.sort((a, b) => a.descricao.localeCompare(b.descricao));
    } else if (criterioDesc === 'desc-inv-alfabetico') {
        tarefas.sort((a, b) => b.descricao.localeCompare(a.descricao));
    }
}

//

export function filtroOrdenarPrioridade(tarefas: Tarefa[]) {
    const criterioPrioridade = document.getElementById('ordenar-prioridade').value;

    const prioridadeValor = (prioridade: Prioridade): number => {
        switch (prioridade) {
            case "Alta": return 3;
            case "Moderada": return 2;
            case "Leve": return 1;
            default: return 0;
        }
    };

    if (criterioPrioridade === 'maior-prioridade') {
        tarefas.sort((a, b) => prioridadeValor(b.prioridade) - prioridadeValor(a.prioridade));
    } else if (criterioPrioridade === 'menor-prioridade') {
        tarefas.sort((a, b) => prioridadeValor(a.prioridade) - prioridadeValor(b.prioridade));
    }
}

//

export function filtroOrdernarTempo(tarefas: Tarefa[]) {
    const criterioData = (document.getElementById('ordenar-data') as HTMLSelectElement).value;

    if (criterioData === 'Recente') {
        tarefas.sort((a, b) => {
            const dataA = new Date(a.data.split('/').reverse().join('-') + 'T' + a.hora);
            const dataB = new Date(b.data.split('/').reverse().join('-') + 'T' + b.hora);
            return dataB.getTime() - dataA.getTime();
        });
    } else if (criterioData === 'mais-antigo') {
        tarefas.sort((a, b) => {
            const dataA = new Date(a.data.split('/').reverse().join('-') + 'T' + a.hora);
            const dataB = new Date(b.data.split('/').reverse().join('-') + 'T' + b.hora);
            return dataA.getTime() - dataB.getTime();
        });
    }
}

//

export function ordenarTarefas(tarefas: Tarefa[], campo, ordem) {
    const direcao = ordem === 'Decrescente' ? -1 : 1;

    const prioridadeMap = {
        'Alta': 3,
        'Moderada': 2,
        'Leve': 1
    };



    return tarefas.slice().sort((a, b) => {
        let valorA, valorB;

        switch (campo) {
            case 'Nome':
                valorA = a.nome.toLowerCase();
                valorB = b.nome.toLowerCase();
                return valorA.localeCompare(valorB) * direcao;

            case 'Prioridade':
                valorA = prioridadeMap[a.prioridade] || 0;
                valorB = prioridadeMap[b.prioridade] || 0;
                return (valorA - valorB) * direcao;

            case 'Data de Conclusão':
                const dataA = parseDataHora(a.data, a.hora);
                const dataB = parseDataHora(b.data, b.hora);
                return (dataA.getTime() - dataB.getTime()) * direcao;

            default:
                return 0;
        }
    });
}
