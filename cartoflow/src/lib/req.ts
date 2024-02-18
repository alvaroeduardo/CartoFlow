import { api } from "./axios";

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

interface Categorias {
    id: string;
    title: string;
}[]

export const startNewCaixa = async () => {
    try {
        const caixas = await api.post('/caixas');

        return caixas
    } catch (error) {
        console.log(error)
    }
}

export const getAllCaixas = async () => {
    try {
        const caixasReq = await api.get('/caixas');

        const caixas: Caixas[] = caixasReq.data

        return caixas;
    } catch (error) {
        console.log(error);
    }
}

export const getOpenCaixa = async () => {
    try {
        const caixaReq = await api.get('/caixa');

        const caixa: Caixas = caixaReq.data;

        return caixa
    } catch (error) {
        console.log(error)
    }
}

export const getAllCategories = async () => {
    try {
        const categoriaReq = await api.get('/categorias');

        const categoria: Categorias[] = categoriaReq.data;

        return categoria
    } catch (error) {
        console.log(error)
    }
}