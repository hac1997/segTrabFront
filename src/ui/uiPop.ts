//Toggles

export function togglePopCriarListaMenu(liga: boolean) {
    const elemento = document.getElementById('popup-criar-lista-menu') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function togglePopCriarTarefaMenu(liga: boolean) {
    const elemento = document.getElementById('popup-criar-tarefa-menu') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function togglePopBuscaJanela(liga: boolean) {
    const elemento = document.getElementById('popup-buscar-tarefa') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function toggleBotaoAlertaTarefaAVencer(liga: boolean) {
    const elemento = document.getElementById('botao-flutuante-alerta') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function togglePopTarefasAVencer(liga: boolean) {
    const elemento = document.getElementById('popup-tarefas-vencer') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function togglePopRelatorio(liga: boolean) {
    const elemento = document.getElementById('popup-relatorios') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function togglePopEditarTareda(liga: boolean) {
    const elemento = document.getElementById('popup-editar-tarefa') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}

export function togglePopEditarLista(liga: boolean) {
    const elemento = document.getElementById('popup-editar-lista') as HTMLElement;
    if (elemento) {
        elemento.style.display = liga ? "flex" : "none";
    }
}







