// script pra rodar no console e preencher a localStorage

const listas = [
    { id: 'mbe8ery2001ttevlk3tbi', nome: "Trabalho", tarefas: [], tipoOrdenacao: "ord-nenhuma", ordemOrdenacao: "ord-asc" },
    { id: 'mbe8f9ruimi9x7s47j', nome: "Pessoal", tarefas: [], tipoOrdenacao: "ord-prioridade", ordemOrdenacao: "ord-desc" },
    { id: 'mbe8fl8cqw5tbz7qdpf', nome: "Estudos", tarefas: [], tipoOrdenacao: "ord-data-conclusao", ordemOrdenacao: "ord-asc" },
    { id: 'mbe8g0kzfavgezrgb3q', nome: "Projetos", tarefas: [], tipoOrdenacao: "ord-Nome", ordemOrdenacao: "ord-asc" }
];

const tarefas = [
    // Lista: Trabalho
    {
        id: "tsk1_trabalho",
        nome: "Revisar contrato de parceria",
        descricao: "Analisar cláusulas de rescisão e prazos de pagamento no contrato da empresa X.",
        prioridade: "Alta",
        listaId: "mbe8ery2001ttevlk3tbi",
        data: "01/06/2025",
        hora: "09:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    },
    {
        id: "tsk2_trabalho",
        nome: "Enviar proposta para o cliente Y",
        descricao: "Montar e enviar proposta comercial detalhada com o escopo do novo projeto de desenvolvimento.",
        prioridade: "Moderada",
        listaId: "mbe8ery2001ttevlk3tbi",
        data: "01/06/2025",
        hora: "14:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    },

    // Lista: Pessoal
    {
        id: "tsk1_pessoal",
        nome: "Levar carro para revisão",
        descricao: "Troca de óleo, alinhamento, balanceamento e verificação dos freios.",
        prioridade: "Alta",
        listaId: "mbe8f9ruimi9x7s47j",
        data: "02/06/2025",
        hora: "10:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    },
    {
        id: "tsk2_pessoal",
        nome: "Reservar hospedagem para viagem",
        descricao: "Pesquisar e reservar hotel para as férias em Salvador no final de julho.",
        prioridade: "Moderada",
        listaId: "mbe8f9ruimi9x7s47j",
        data: "03/06/2025",
        hora: "20:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: true
    },

    // Lista: Estudos
    {
        id: "tsk1_estudos",
        nome: "Refazer exercícios de algoritmos",
        descricao: "Resolver novamente os exercícios de recursão e listas encadeadas do curso.",
        prioridade: "Alta",
        listaId: "mbe8fl8cqw5tbz7qdpf",
        data: "01/06/2025",
        hora: "17:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    },
    {
        id: "tsk2_estudos",
        nome: "Assistir aula gravada de SQL",
        descricao: "Aula sobre modelagem de banco de dados relacional (professor Ricardo, módulo 4).",
        prioridade: "Leve",
        listaId: "mbe8fl8cqw5tbz7qdpf",
        data: "02/06/2025",
        hora: "21:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    },

    // Lista: Projetos
    {
        id: "tsk1_projetos",
        nome: "Adicionar autenticação no app financeiro",
        descricao: "Implementar sistema de login com token JWT e autenticação por email.",
        prioridade: "Alta",
        listaId: "mbe8g0kzfavgezrgb3q",
        data: "03/06/2025",
        hora: "11:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    },
    {
        id: "tsk2_projetos",
        nome: "Reestruturar API de tarefas",
        descricao: "Organizar rotas RESTful e melhorar performance de consultas no MongoDB.",
        prioridade: "Moderada",
        listaId: "mbe8g0kzfavgezrgb3q",
        data: "04/06/2025",
        hora: "16:00",
        dataConclusao: "",
        horaConclusao: "",
        concluida: false,
        autoconcluir: false
    }
];


const subtarefas = [
    // Revisar contrato de parceria
    { descricao: "Checar cláusulas de confidencialidade", checkbox: false, id: "subt1", idTarefaMae: "tsk1_trabalho" },
    { descricao: "Revisar prazos de entrega e pagamento", checkbox: false, id: "subt2", idTarefaMae: "tsk1_trabalho" },
    { descricao: "Verificar penalidades por atraso", checkbox: false, id: "subt3", idTarefaMae: "tsk1_trabalho" },

    // Levar carro para revisão
    { descricao: "Trocar óleo e filtro", checkbox: false, id: "subt4", idTarefaMae: "tsk1_pessoal" },
    { descricao: "Verificar nível de água do radiador", checkbox: false, id: "subt5", idTarefaMae: "tsk1_pessoal" },
    { descricao: "Checar pastilhas de freio", checkbox: false, id: "subt6", idTarefaMae: "tsk1_pessoal" },

    // Refazer exercícios de algoritmos
    { descricao: "Resolver problema de fatorial recursivo", checkbox: false, id: "subt7", idTarefaMae: "tsk1_estudos" },
    { descricao: "Refazer exercício de listas duplamente encadeadas", checkbox: false, id: "subt8", idTarefaMae: "tsk1_estudos" },

    // Adicionar autenticação no app financeiro
    { descricao: "Criar endpoint de login", checkbox: false, id: "subt9", idTarefaMae: "tsk1_projetos" },
    { descricao: "Implementar refresh token", checkbox: false, id: "subt10", idTarefaMae: "tsk1_projetos" },
    { descricao: "Testar fluxo com Postman", checkbox: false, id: "subt11", idTarefaMae: "tsk1_projetos" }
];


localStorage.setItem("listas", JSON.stringify(listas));
localStorage.setItem("tarefas", JSON.stringify(tarefas));
localStorage.setItem("subtarefas", JSON.stringify(subtarefas));