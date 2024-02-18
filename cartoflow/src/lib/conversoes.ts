interface Caixas {
    id: string;
    cashValue: number | null;
    sealValue: number | null;
    closed: boolean;
    createdAt: string;
    finishedIn: string | null;
    Transacao: {
        id: string;
        idCaixa: string;
        idCategoria: string;
        description: string;
        input: boolean;
        value: string;
        createdAt: string;
        categoria: {
            id: string;
            title: string;
        };
    }[];
}

export function formatarData(dataString: string): string {
    const data = parseDataISO(dataString);
    const dia = adicionarZeroEsquerda(data.getDate());
    const mes = adicionarZeroEsquerda(data.getMonth() + 1);
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function parseDataISO(dataString: string): Date {
    return new Date(dataString);
}

function adicionarZeroEsquerda(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
}

export function formatarMoeda(valor?: number | null): string {
    if (valor === null || valor === undefined) {
        return "R$ 0,00";
    }

    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function somarTransacoesPorTipo(caixa: Caixas, tipo: 'movimento' | 'saida'): number {
    let total = 0;
    caixa.Transacao.forEach(transacao => {
        if ((tipo === 'movimento' && transacao.input) || (tipo === 'saida' && !transacao.input)) {
            total += parseFloat(transacao.value);
        }
    });
    return total;
}

export function calcularSaldo(caixa: Caixas): number {
    let saldo = 0;
    caixa.Transacao.forEach(transacao => {
        const valor = parseFloat(transacao.value);
        if (transacao.input) {
            saldo += valor;
        } else {
            saldo -= valor;
        }
    });
    return saldo;
}
