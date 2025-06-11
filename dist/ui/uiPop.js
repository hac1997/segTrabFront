//Toggles
export function togglePopCriarListaMenu(liga) {
    const elemento = document.getElementById('popup-criar-lista-menu');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function togglePopCriarTarefaMenu(liga) {
    const elemento = document.getElementById('popup-criar-tarefa-menu');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function togglePopBuscaJanela(liga) {
    const elemento = document.getElementById('popup-buscar-tarefa');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function toggleBotaoAlertaTarefaAVencer(liga) {
    const elemento = document.getElementById('botao-flutuante-alerta');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function togglePopTarefasAVencer(liga) {
    const elemento = document.getElementById('popup-tarefas-vencer');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function togglePopRelatorio(liga) {
    const elemento = document.getElementById('popup-relatorios');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function togglePopEditarTareda(liga) {
    const elemento = document.getElementById('popup-editar-tarefa');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
export function togglePopEditarLista(liga) {
    const elemento = document.getElementById('popup-editar-lista');
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}
//# sourceMappingURL=uiPop.js.map