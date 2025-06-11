import { carregarValoresPopEditarTarefa } from "../ui/ui.js";
import { togglePopEditarLista } from "../ui/uiPop.js";
import { puxarListas } from "../utils/utils.js";
export function criarListaContainer(lista) {
    const listaContainer = document.createElement('div');
    listaContainer.className = 'lista-container';
    listaContainer.id = lista.id;
    const listaHeader = document.createElement('div');
    listaHeader.className = 'lista-header';
    listaHeader.innerHTML = `
            <h3 class="nome-lista">${lista.nome}</h3>
            <div class="icone-hamburguer">
                <img src="img/menu-hamburguer.jpg" alt="Menu">
            </div>
        `;
    listaHeader.querySelector('.icone-hamburguer').addEventListener('click', () => {
        abrirPopupEditarLista(lista.id);
    });
    return [listaContainer, listaHeader];
}
//essa função só existe em razão da intra lógica do menuhamburger 
export function abrirPopupEditarLista(listaId) {
    const listas = puxarListas();
    const lista = listas.find(l => l.id === listaId);
    if (!lista)
        return;
    carregarValoresPopEditarTarefa(lista);
    togglePopEditarLista(true);
}
//# sourceMappingURL=listaContainer.js.map