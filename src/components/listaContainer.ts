import { Lista } from "../types/types";
import { carregarValoresPopEditarTarefa } from "../ui/ui";
import { togglePopEditarLista } from "../ui/uiPop";
import { puxarListas } from "../utils/utils";

export function criarListaContainer(lista: Lista): HTMLDivElement[] {
    const listaContainer = document.createElement('div');
    listaContainer.className = 'lista-container';
    listaContainer.id = lista.id;
    const listaHeader = document.createElement('div');
    listaHeader.className = 'lista-header';
    listaHeader.innerHTML = `
            <h3 class="nome-lista">${lista.nome}</h3>
            <div class="icone-hamburguer">
                <img src="public/img/menu-hamburguer.jpg" alt="Menu">
            </div>
        `;

    (listaHeader.querySelector('.icone-hamburguer') as HTMLElement).addEventListener('click', () => {
        abrirPopupEditarLista(lista.id);
    });
    return [listaContainer, listaHeader];
}


//essa função só existe em razão da intra lógica do menuhamburger 
export function abrirPopupEditarLista(listaId: string) {
    const listas = puxarListas();
    const lista = listas.find(l => l.id === listaId);
    if (!lista) return;
    carregarValoresPopEditarTarefa(lista);
    togglePopEditarLista(true);  
}