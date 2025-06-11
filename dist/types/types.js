import { gerarIdUnico } from "../utils/utils.js";
//construtores vulgares (sem classe)
export function construirLista(id, nome) {
    const novaLista = {
        id: id,
        nome: nome,
        tarefas: [],
        tipoOrdenacao: "",
        ordemOrdenacao: "",
    };
    return novaLista;
}
export function construirTarefa(idTarefa, nomeTarefa, descricao, prioridade, listaId, data, hora) {
    let tarefaSaida = {
        id: idTarefa,
        nome: nomeTarefa,
        descricao,
        prioridade,
        listaId,
        data,
        hora,
        concluida: false,
        dataConclusao: "",
        horaConclusao: "",
        autoconcluir: false
    };
    return tarefaSaida;
}
export function construirSubtarefa(descricao, idTarefaMae) {
    let subtarefaSaida = {
        id: gerarIdUnico(),
        descricao: descricao,
        concluida: false,
        idTarefaMae: idTarefaMae,
    };
    return subtarefaSaida;
}
//# sourceMappingURL=types.js.map