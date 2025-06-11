// funções de validação de datas e horas
//auxiliares
function diasNoMes(mes, ano) {
    if (mes === 2) {
        return ehBissexto(ano) ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(mes)) {
        return 30;
    }
    return 31;
}
;
export function tempoRestanteParaVencer(tarefa) {
    const [day, month, year] = tarefa.data.split('/').map(Number);
    const [hour, minute] = tarefa.hora.split(':').map(Number);
    const dataTarefa = new Date(year, month - 1, day, hour, minute);
    const agora = new Date();
    const diffMs = dataTarefa.getTime() - agora.getTime();
    if (diffMs <= 0) {
        return 'Já venceu';
    }
    const diffMin = Math.floor(diffMs / 60000);
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;
    let resultado = 'a tarefa vencerá em ';
    if (horas > 0) {
        resultado += `${horas} hora${horas !== 1 ? 's' : ''}`;
    }
    if (horas > 0 && minutos > 0) {
        resultado += ' e ';
    }
    if (minutos > 0) {
        resultado += `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    }
    return resultado;
}
// Converte data e hora
export function formatarData(data) {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
export function formatarHora(data) {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
}
export function parseData(dataString) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = regex.exec(dataString);
    if (!match) {
        throw new Error("Formato de data inválido. Use dd/mm/aaaa.");
    }
    const [, dia, mes, ano] = match;
    return [parseInt(dia, 10), parseInt(mes, 10), parseInt(ano, 10)];
}
;
export function parseDataHora(dataStr, horaStr) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    const [hora, minuto] = horaStr.split(':').map(Number);
    return new Date(ano, mes - 1, dia, hora, minuto);
}
export function parseDataBrasil(dataStr) {
    if (!dataStr)
        return null;
    const partes = dataStr.split('/');
    const [dia, mes, ano] = partes;
    return new Date(`${ano}-${mes}-${dia}`);
}
export function getAnoSemana(data) {
    const onejan = new Date(data.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return data.getFullYear() + '-S' + Math.ceil((((data.getTime() - onejan.getTime()) / millisecsInDay) + onejan.getDay() + 1) / 7);
}
//validadores 
export function validaData(dataString) {
    const partes = parseData(dataString);
    const [dia, mes, ano] = partes;
    if (mes < 1 || mes > 12) {
        return false;
    }
    const maxDias = diasNoMes(mes, ano);
    return dia >= 1 && dia <= maxDias;
}
;
export function validaHora(horaString) {
    const regex = /^(\d{2}):(\d{2})$/;
    const match = regex.exec(horaString);
    if (!match) {
        throw new Error("Formato de hora inválido. Use hh:mm.");
    }
    const hora = parseInt(match[1], 10);
    const minuto = parseInt(match[2], 10);
    return !(minuto < 0 || minuto > 59 || hora > 23 || hora < 0);
}
export function dataExpirada(data, hora) {
    const [day, month, year] = data.split('/').map(Number);
    const [hour, minute] = hora.split(':').map(Number);
    const inputDate = new Date(year, month - 1, day, hour, minute);
    const now = new Date();
    return now >= inputDate;
}
function ehBissexto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
}
;
//# sourceMappingURL=utilsDataHora.js.map