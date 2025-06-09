import { construirLista, construirSubtarefa, construirTarefa, Lista, Prioridade, Subtarefa, Tarefa } from "../types/types";
import { validaData, validaHora } from "./utilsDataHora";
//Importação de dados do Local Storage

export function puxarTarefas(): Tarefa[] {
    return JSON.parse(localStorage.getItem('tarefas') ?? '[]');
}

export function puxarListas(): Lista[] {
    return JSON.parse(localStorage.getItem('listas') ?? '[]');
}

export function puxarSubtarefas(): Subtarefa[] {
    return JSON.parse(localStorage.getItem('subtarefas') ?? '[]');
}

export function puxarCheckedFiltroStatus() {
    return {
        pendente: (document.querySelector('input[type="checkbox"][name="pendente"]') as HTMLInputElement).checked,
        concluida: (document.querySelector('input[type="checkbox"][name="concluida"]') as HTMLInputElement).checked,
        vencido: (document.querySelector('input[type="checkbox"][name="vencido"]') as HTMLInputElement).checked
    }
}

export function puxarCheckedFiltroPrioridade() {
    return {
        baixa: (document.querySelector('input[type="checkbox"][name="Prioridade Baixa"]') as HTMLInputElement).checked,
        media: (document.querySelector('input[type="checkbox"][name="Prioridade média"]') as HTMLInputElement).checked,
        alta: (document.querySelector('input[type="checkbox"][name="Prioridade alta"]') as HTMLInputElement).checked
    }
}

export function puxarTarefasVencer(dias:number) {
    const agora = new Date();
    const limite = new Date();
    limite.setDate(limite.getDate() + dias); // Próximas 2

    return puxarTarefas().filter(tarefa => {
        const [day, month, year] = tarefa.data.split('/').map(Number);
        const [hour, minute] = tarefa.hora.split(':').map(Number);
        const momentoDaTarefaVencer = new Date(year, month - 1, day, hour, minute);
        return momentoDaTarefaVencer > agora && momentoDaTarefaVencer <= limite;
    });
}

//Exclusão de dados do Local Storage


export function excluirLista(listaId: string) {
    const listas: Lista[] = puxarListas();
    const tarefas: Tarefa[] = puxarTarefas();

    const listasAtualizadas: Lista[] = listas.filter(lista => lista.id !== listaId);
    const tarefasAtualizadas: Tarefa[] = tarefas.filter(tarefa => tarefa.listaId !== listaId);

    localStorage.setItem('listas', JSON.stringify(listasAtualizadas));
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));

}


export function excluirTarefa(tarefaId: string) {
    const tarefas = puxarTarefas();
    const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.id !== tarefaId);

    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
}


//salvar os dados no local storage

export function salvarSubtarefas(subtarefas: Subtarefa[]) {
    localStorage.setItem("subtarefas", JSON.stringify(subtarefas));
}

//salvarsubtarefa != salvarsubtarefa->S<-
export function salvarSubtarefa(tarefa: Tarefa, descricao: string): void {
    const subtarefas = puxarSubtarefas();

    if (!descricao) {
        alert('Por favor, escreva uma descrição!');
        return;
    }

    const novasubTarefa = construirSubtarefa(descricao, tarefa.id);
    subtarefas.push(novasubTarefa);
    localStorage.setItem('subtarefas', JSON.stringify(subtarefas));
}

export function salvarTarefa(idTarefa: string, nomeTarefa: string, descricao: string, prioridade: Prioridade, listaId: string, data: string, hora: string): void {
    const erro: string = validarCampos(nomeTarefa, prioridade, descricao, listaId, data, hora);
    if (erro != "") return alert(erro);

    const tarefas: Tarefa[] = puxarTarefas();

    let novaTarefaBase: Tarefa;
    let novaListaTarefas: Tarefa[];

    if (idTarefa !== '') {
        novaTarefaBase = construirTarefa(idTarefa, nomeTarefa, descricao, prioridade, listaId, data, hora)
        //atualiza a tarefa ->
        novaListaTarefas = tarefas.map(t => (t.id === idTarefa ? { ...novaTarefaBase, id: idTarefa } : t));
    }
    else {
        novaTarefaBase = construirTarefa(gerarIdUnico(), nomeTarefa, descricao, prioridade, listaId, data, hora)
        //adiciona a tarefa ->
        tarefas.push(novaTarefaBase);
        novaListaTarefas = tarefas;
    }

    localStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
}

export function salvarLista(nomeLista: string) {
    if (!nomeLista.trim()) {
        alert('Por favor, preencha o nome da lista!');
        return;
    }
    let listas = puxarListas();
    const nomeExiste = listas.some(
        lista => lista.nome.toLowerCase() === nomeLista.toLowerCase()
    );

    if (nomeExiste) {
        alert('Já existe uma lista com esse nome! Por favor, escolha outro nome.');
        return;
    }

    const novaLista = construirLista(gerarIdUnico(), nomeLista);
    listas.push(novaLista);
    localStorage.setItem('listas', JSON.stringify(listas));

}



function validarCampos(nomeTarefa: string, prioridade: string, descricao: string, listaId: string, data: string, hora: string): string {
    if (!nomeTarefa.trim()) return 'Por favor, preencha o nome da tarefa!';
    if (!prioridade) return 'Por favor, selecione a prioridade!';
    if (!descricao) return 'Por favor, escreva uma descrição!';
    if (!listaId) return 'Por favor, selecione uma lista!';
    if (!validaData(data)) return 'Por favor, insira uma data correta!';
    if (!validaHora(hora)) return 'Por favor, insira uma hora correta!';
    return "";
};

export function media(array: number[]) {
    if (array.length === 0) return 0;
    const soma = array.reduce((a, b) => a + b, 0);
    return soma / array.length;
}


export function gerarIdUnico(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}


export function calcularTarefasConcluidas() {
    const listaDeTarefas = puxarTarefas().filter(tarefa => tarefa.concluida);
    return listaDeTarefas.length;
}
export function calcularTarefasPendentes() {
    const listaDeTarefas = puxarTarefas().filter(tarefa => !tarefa.concluida);
    return listaDeTarefas.length;
}
export function calcularTarefasTotal() {
    return calcularTarefasConcluidas() + calcularTarefasPendentes();
}




