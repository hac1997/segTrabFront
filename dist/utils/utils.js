import { construirLista, construirSubtarefa, construirTarefa } from "../types/types.js";
import { validaData, validaHora } from "./utilsDataHora.js";
//Importação de dados do Local Storage
export function puxarTarefas() {
    var _a;
    return JSON.parse((_a = localStorage.getItem('tarefas')) !== null && _a !== void 0 ? _a : '[]');
}
export function puxarListas() {
    var _a;
    return JSON.parse((_a = localStorage.getItem('listas')) !== null && _a !== void 0 ? _a : '[]');
}
export function puxarSubtarefas() {
    var _a;
    return JSON.parse((_a = localStorage.getItem('subtarefas')) !== null && _a !== void 0 ? _a : '[]');
}
export function puxarCheckedFiltroStatus() {
    return {
        pendente: document.querySelector('input[type="checkbox"][name="pendente"]').checked,
        concluida: document.querySelector('input[type="checkbox"][name="concluida"]').checked,
        vencido: document.querySelector('input[type="checkbox"][name="vencido"]').checked
    };
}
export function puxarCheckedFiltroPrioridade() {
    return {
        baixa: document.querySelector('input[type="checkbox"][name="Prioridade Baixa"]').checked,
        media: document.querySelector('input[type="checkbox"][name="Prioridade média"]').checked,
        alta: document.querySelector('input[type="checkbox"][name="Prioridade alta"]').checked
    };
}
export function puxarTarefasVencer(dias) {
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
export function excluirLista(listaId) {
    const listas = puxarListas();
    const tarefas = puxarTarefas();
    const listasAtualizadas = listas.filter(lista => lista.id !== listaId);
    const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.listaId !== listaId);
    localStorage.setItem('listas', JSON.stringify(listasAtualizadas));
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
}
export function excluirTarefa(tarefaId) {
    const tarefas = puxarTarefas();
    const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.id !== tarefaId);
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
}
//salvar os dados no local storage
export function salvarSubtarefas(subtarefas) {
    localStorage.setItem("subtarefas", JSON.stringify(subtarefas));
}
//salvarsubtarefa != salvarsubtarefa->S<-
export function salvarSubtarefa(tarefa, descricao) {
    const subtarefas = puxarSubtarefas();
    if (!descricao) {
        alert('Por favor, escreva uma descrição!');
        return;
    }
    const novasubTarefa = construirSubtarefa(descricao, tarefa.id);
    subtarefas.push(novasubTarefa);
    localStorage.setItem('subtarefas', JSON.stringify(subtarefas));
}
export function salvarTarefa(idTarefa, nomeTarefa, descricao, prioridade, listaId, data, hora) {
    const erro = validarCampos(nomeTarefa, prioridade, descricao, listaId, data, hora);
    if (erro != "")
        return alert(erro);
    const tarefas = puxarTarefas();
    let novaTarefaBase;
    let novaListaTarefas;
    if (idTarefa !== '') {
        novaTarefaBase = construirTarefa(idTarefa, nomeTarefa, descricao, prioridade, listaId, data, hora);
        //atualiza a tarefa ->
        novaListaTarefas = tarefas.map(t => (t.id === idTarefa ? Object.assign(Object.assign({}, novaTarefaBase), { id: idTarefa }) : t));
    }
    else {
        novaTarefaBase = construirTarefa(gerarIdUnico(), nomeTarefa, descricao, prioridade, listaId, data, hora);
        //adiciona a tarefa ->
        tarefas.push(novaTarefaBase);
        novaListaTarefas = tarefas;
    }
    localStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
}
export function salvarLista(nomeLista) {
    if (!nomeLista.trim()) {
        alert('Por favor, preencha o nome da lista!');
        return;
    }
    let listas = puxarListas();
    const nomeExiste = listas.some(lista => lista.nome.toLowerCase() === nomeLista.toLowerCase());
    if (nomeExiste) {
        alert('Já existe uma lista com esse nome! Por favor, escolha outro nome.');
        return;
    }
    const novaLista = construirLista(gerarIdUnico(), nomeLista);
    listas.push(novaLista);
    localStorage.setItem('listas', JSON.stringify(listas));
}
function validarCampos(nomeTarefa, prioridade, descricao, listaId, data, hora) {
    if (!nomeTarefa.trim())
        return 'Por favor, preencha o nome da tarefa!';
    if (!prioridade)
        return 'Por favor, selecione a prioridade!';
    if (!descricao)
        return 'Por favor, escreva uma descrição!';
    if (!listaId)
        return 'Por favor, selecione uma lista!';
    if (!validaData(data))
        return 'Por favor, insira uma data correta!';
    if (!validaHora(hora))
        return 'Por favor, insira uma hora correta!';
    return "";
}
;
export function media(array) {
    if (array.length === 0)
        return 0;
    const soma = array.reduce((a, b) => a + b, 0);
    return soma / array.length;
}
export function gerarIdUnico() {
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
//# sourceMappingURL=utils.js.map