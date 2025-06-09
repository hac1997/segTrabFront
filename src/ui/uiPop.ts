//Toggles

export function togglePopCriarListaMenu(liga: boolean) {
    let popDisplay = (document.getElementById('popup-criar-lista-menu') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}
export function togglePopCriarTarefaMenu(liga: boolean) {
    let popDisplay = (document.getElementById('popup-criar-tarefa-menu') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}

export function togglePopBuscaJanela(liga: boolean) {
    let popDisplay = (document.getElementById('popup-buscar-tarefa') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}

export function toggleBotaoAlertaTarefaAVencer(liga: boolean) {
    let popDisplay = (document.getElementById('botao-flutuante-alerta') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}

export function togglePopTarefasAVencer(liga: boolean) {
    let popDisplay = (document.getElementById('popup-tarefas-vencer') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}

export function togglePopRelatorio(liga: boolean) {
    let popDisplay = (document.getElementById('popup-relatorios') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}

export function togglePopEditarTareda(liga: boolean) {
    let popDisplay = (document.getElementById('popup-editar-tarefa') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}

export function togglePopEditarLista(liga: boolean) {
    let popDisplay = (document.getElementById('popup-editar-lista') as HTMLElement).style.display;
    popDisplay = (liga? "flex" : "none")
}






