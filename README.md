# Projeto TaskHub

classDiagram
    direction TB

    class Lista {
        +id: string
        +nome: string
        +tarefas: string[]
        +tipoOrdenacao: string
        +ordemOrdenacao: string
        +construirLista(id, nome): Lista
    }

    class Tarefa {
        +id: string
        +nome: string
        +descricao: string
        +prioridade: Prioridade
        +listaId: string
        +data: string
        +hora: string
        +dataConclusao: string
        +horaConclusao: string
        +concluida: boolean
        +autoconcluir: boolean
        +construirTarefa(id, nome, desc, prio, listId, data, hora): Tarefa
    }

    class Subtarefa {
        +id: string
        +descricao: string
        +concluida: boolean
        +idTarefaMae: string
        +construirSubtarefa(desc, idTarefaMae): Subtarefa
    }

    class Prioridade << (E,green) >> {
        Alta
        Moderada
        Leve
    }

    class ListaComponents {
        +criarListaContainer(lista: Lista): HTMLDivElement[]
        +abrirPopupEditarLista(listaId: string)
    }

    class SubtarefaComponents {
        +criarSubtarefaDiv(subtarefa: Subtarefa): HTMLDivElement
        +gerarEventListenersSubtarefa(subtarefaDiv, subtarefa, todasSubtarefas, tarefa)
    }

    class TarefaComponents {
        +criarTarefaDiv(tarefa: Tarefa): HTMLDivElement
        +criarElementoTarefa(tarefa: Tarefa)
    }

    class TaskManagement {
        +atualizarStatusTarefa(tarefaId: string, concluida: boolean)
        +atualizarCheckboxSubtarefas(tarefaId: string)
        +abrirPopCriarTarefa()
    }

    class UI {
        +construirOpcoesSelectListas(divLista: HTMLDivElement)
        +criarOpcaoLista(listaId: string, listaNome: string): HTMLOptionElement
        +carregarValoresPopEditarTarefa(lista: Lista)
        +preencherCamposEditarTarefa(tarefa: Tarefa)
        +esvaziarCamposCriarTarefaMenu()
        +carregarSubTarefas(tarefa: Tarefa, subdiv: HTMLDivElement)
        +carregarTarefasAVencer(tarefas: Tarefa[], divContainer: HTMLDivElement)
        +carregarTarefas(tarefas: Tarefa[], divContainer: HTMLDivElement)
        +abrirPopupEditarTarefa(tarefaId: string)
        +carregarListas(listas: Lista[], div: HTMLDivElement)
        +atualizarRelatorios()
        +atualizarCamposRelatorios(total, concluidas, pendentes, mediaDia, mediaSemana, mediaMes)
        +preencherGraficoPizza(percConcluidas, percPendentes)
    }

    class UIPopup {
        +togglePopCriarListaMenu(liga: boolean)
        +togglePopCriarTarefaMenu(liga: boolean)
        +togglePopBuscaJanela(liga: boolean)
        +toggleBotaoAlertaTarefaAVencer(liga: boolean)
        +togglePopTarefasAVencer(liga: boolean)
        +togglePopRelatorio(liga: boolean)
        +togglePopEditarTareda(liga: boolean)
        +togglePopEditarLista(liga: boolean)
    }

    class StorageUtils {
        +puxarTarefas(): Tarefa[]
        +puxarListas(): Lista[]
        +puxarSubtarefas(): Subtarefa[]
        +puxarCheckedFiltroStatus()
        +puxarCheckedFiltroPrioridade()
        +puxarTarefasVencer(dias: number): Tarefa[]
        +excluirLista(listaId: string)
        +excluirTarefa(tarefaId: string)
        +salvarSubtarefas(subtarefas: Subtarefa[])
        +salvarSubtarefa(tarefa: Tarefa, descricao: string)
        +salvarTarefa(idTarefa, nome, desc, prio, listId, data, hora)
        +salvarLista(nomeLista: string)
        +media(array: number[])
        +gerarIdUnico(): string
        +calcularTarefasConcluidas(): number
        +calcularTarefasPendentes(): number
        +calcularTarefasTotal(): number
    }

    class DataTimeUtils {
        +tempoRestanteParaVencer(tarefa: Tarefa): string
        +formatarData(data: Date): string
        +formatarHora(data: Date): string
        +parseData(dataString: string): number[]
        +parseDataHora(dataStr: string, horaStr: string): Date
        +parseDataBrasil(dataStr: string): Date | null
        +getAnoSemana(data: Date): string
        +validaData(dataString: string): boolean
        +validaHora(horaString: string): boolean
        +dataExpirada(data: string, hora: string): boolean
    }

    class FilterSortUtils {
        +ehVencida(tarefa: Tarefa): boolean
        +ehConcluida(tarefa: Tarefa): boolean
        +ehPendente(tarefa: Tarefa): boolean
        +filtrarTarefas(tarefas, filtroStatus, filtroPrioridade)
        +filtroOrdenarDescricao(tarefaFiltrada)
        +filtroOrdenarPrioridade(tarefaFiltrada)
        +filtroOrdernarTempo(tarefaFiltrada)
        +ordenarTarefas(tarefas, tipoOrdenacao, ordemOrdenacao)
    }

    Lista "1" *-- "0..*" Tarefa : contém
    Tarefa "1" *-- "0..*" Subtarefa : contém
    Tarefa --> Prioridade : tem

    ListaComponents ..> Lista
    ListaComponents ..> StorageUtils : puxarListas
    ListaComponents ..> UI : carregarValoresPopEditarTarefa
    ListaComponents ..> UIPopup : togglePopEditarLista

    SubtarefaComponents ..> Subtarefa
    SubtarefaComponents ..> StorageUtils : salvarSubtarefas
    SubtarefaComponents ..> TaskManagement : atualizarStatusTarefa
    SubtarefaComponents ..> FilterSortUtils : confereCheckbox

    TarefaComponents ..> Tarefa
    TarefaComponents ..> DataTimeUtils : tempoRestanteParaVencer
    TarefaComponents ..> DataTimeUtils : dataExpirada

    TaskManagement ..> Tarefa
    TaskManagement ..> Subtarefa
    TaskManagement ..> StorageUtils : puxarTarefas, puxarSubtarefas
    TaskManagement ..> UI : construirOpcoesSelectListas, esvaziarCamposCriarTarefaMenu
    TaskManagement ..> UIPopup : togglePopCriarTarefaMenu

    UI ..> Lista
    UI ..> Tarefa
    UI ..> Subtarefa
    UI ..> ListaComponents
    UI ..> SubtarefaComponents
    UI ..> TarefaComponents
    UI ..> TaskManagement
    UI ..> StorageUtils : puxarListas, puxarTarefas, puxarSubtarefas, puxarCheckedFiltroPrioridade, puxarCheckedFiltroStatus
    UI ..> DataTimeUtils : parseDataBrasil, getAnoSemana
    UI ..> FilterSortUtils
    UI ..> UIPopup

    StorageUtils ..> Lista
    StorageUtils ..> Tarefa
    StorageUtils ..> Subtarefa
    StorageUtils ..> DataTimeUtils : validaData, validaHora
    StorageUtils ..> FilterSortUtils : ehVencida

    DataTimeUtils ..> Tarefa

    FilterSortUtils ..> Tarefa
    FilterSortUtils ..> DataTimeUtils : dataExpirada
    FilterSortUtils ..> StorageUtils : puxarCheckedFiltroPrioridade, puxarCheckedFiltroStatus

## Descrição do Projeto: 

O projeto se trata de um sistema gerenciador de tarefas, planejado para organizar as atividades da rotida.

É possível criar diferentes listas e incluir tarefas específicas para cada tipo de lista.
Depois de criado as listas e tarefas, é possível alterar ou excluir, conforme desejar.
É possível também filtrar por categoria das tarefas, e prioridade. Se desejar também pode filtrar por uma palavra específica ou data.
Também é possível ordenar as listas na tela como achar melhor.

## Membros da Equipe: 

- João Guilherme Guesser
- Herick Andrei de Carvalho
- Vinicius Martins de Melo Lopes

## Paradigma Utilizado

Nosso projeto implenetou na grande maioria das funções, o paradigma de programação funcional

## Aplicação do Paradigma Funcional

1. Funções puras
São funções que, ao receber os mesmos dados, sempre devolvem o mesmo resultado. Elas não alteram variáveis externas nem causam mudanças fora delas.

Foi utilizado este conceito na seguinte função, pois recebe os dados e retorna uma string de erro ou null. Sem efeitos colaterais.

```
const validarCampos = ({ nomeTarefa, prioridade, descricao, listaId, data, hora }) => {
    if (!nomeTarefa.trim()) return 'Por favor, preencha o nome da tarefa!';
    if (!prioridade) return 'Por favor, selecione a prioridade!';
    if (!descricao) return 'Por favor, escreva uma descrição!';
    if (!listaId) return 'Por favor, selecione uma lista!';
    if (!validaData(data)) return 'Por favor, insira uma data correta!';
    if (!validaHora(hora)) return 'Por favor, insira uma hora correta!';
    return null;
};
```

2. Imutabilidade
Os dados são tratados como constantes: em vez de modificar valores existentes, são criadas novas versões com as alterações desejadas. Isso evita muitos erros difíceis de encontrar.

Conceito se aplica na seguinte função, pois recebe uma lista e retorna uma nova lista, sem modificar a original.

```
const atualizarTarefa = (tarefas, idTarefa, novaTarefa) =>
    tarefas.map(t => (t.id === idTarefa ? { ...novaTarefa, id: idTarefa } : t));

```

3. Composição de funções
É o ato de unir funções simples para criar funcionalidades mais complexas. Cada função faz uma parte pequena e específica do trabalho.

Se aplica no seguinte trecho de codigo, pois na função principal as funções puras são encadeadas (combinadas) para produzir o resultado final.

```
// Função pura para criar elemento de tarefa (sem adicionar eventos ou DOM externo)
const criarElementoTarefa = (tarefa) => {
    const tarefaDiv = document.createElement('div');
    tarefaDiv.className = 'tarefa';
    tarefaDiv.id = tarefa.id;

    // Classes de prioridade
    const prioridadeClasses = {
        'Alta': 'alta-prioridade',
        'Moderada': 'moderada-prioridade',
        'Leve': 'leve-prioridade'
    };
    const prioridadeClasse = prioridadeClasses[tarefa.prioridade];
    if (prioridadeClasse) tarefaDiv.classList.add(prioridadeClasse);

    // Verificação de expiração
    if (dataExpirada(tarefa.data, tarefa.hora)) {
        tarefaDiv.className = 'tarefa expirada';
    }

    // Inner HTML
    const tarefaExpiradaMsg = dataExpirada(tarefa.data, tarefa.hora) && !tarefa.concluida
        ? 'Tarefa Expirada!'
        : '';

    tarefaDiv.innerHTML = `
        <input type="checkbox" class="checkbox" ${tarefa.concluida ? 'checked' : ''} id="checkbox-${tarefa.id}">
        <p>${tarefa.nome}</p>
        <p>${tarefaExpiradaMsg}</p>
    `;

    return tarefaDiv;
};

// Função pura para adicionar eventos (retorna função de aplicação)
const aplicarEventosNaTarefa = (tarefaDiv, tarefa) => {
    const checkbox = tarefaDiv.querySelector('.checkbox');

    // Evento de conclusão
    checkbox.addEventListener('change', () => {
        atualizarStatusTarefa(tarefa.id, checkbox.checked);
        if (tarefa.autoconcluir === true) {
            atualizarCheckboxSubtarefas(tarefa.id, checkbox.checked);
        }
    });

    // Evento de clique para edição
    tarefaDiv.addEventListener('click', (event) => {
        if (!event.target.classList.contains('checkbox')) {
            abrirPopupEditarTarefa(tarefa.id);
        }
    });

    return tarefaDiv;
};

// Função principal (efeito colateral controlado)
export function carregarTarefas(tarefas, divContainer) {
    const elementosTarefas = tarefas
        .map(criarElementoTarefa)
        .map((el, i) => aplicarEventosNaTarefa(el, tarefas[i]));

    elementosTarefas.forEach(tarefaEl => {
        divContainer.appendChild(tarefaEl);
    });
}

```

4. Sem efeitos colaterais
Evita mexer em partes externas ao código, como o navegador, arquivos ou bancos de dados, a não ser que seja realmente necessário — e nesse caso, isso é feito de forma controlada.

5. Funções de ordem superior
São funções que aceitam outras funções como argumentos ou que retornam uma função como resultado. Isso dá mais flexibilidade e poder ao código.

## Exemplo: 

O seguinte trecho de código utilizado abrange todos os conceitos definidos

```
const ehBissexto = (ano) => {
  return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
};

const diasNoMes = (mes, ano) => {
  if (mes === 2) {
    return ehBissexto(ano) ? 29 : 28;
  }

  if ([4, 6, 9, 11].includes(mes)) {
    return 30;
  }

  return 31;
};

const parseData = (dataString) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dataString.match(regex);
  if (!match) {
    return null;
  }

  const [_, dia, mes, ano] = match;
  return [parseInt(dia, 10), parseInt(mes, 10), parseInt(ano, 10)];
};

const validaData = (dataString) => {
  const partes = parseData(dataString);
  if (!partes) {
    return false;
  }

  const [dia, mes, ano] = partes;

  if (mes < 1 || mes > 12) {
    return false;
  }

  const maxDias = diasNoMes(mes, ano);

  return dia >= 1 && dia <= maxDias;
};
```