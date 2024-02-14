import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export async function caixa(app: FastifyInstance) {
    app.get('/caixas', async (req, res) => {
        const paramsSchema = z.object({
            take: z.number().optional(),
            skip: z.number().optional()
        });

        const { take, skip } = paramsSchema.parse(req.query);

        const caixas = await prisma.caixa.findMany({
            take: take ? take : 10,
            skip: skip ? skip : 1
        });

        return res.code(200).send(caixas);
    });

    app.get('/caixas/:idCaixa', async (req, res) => {
        const paramsSchema = z.object({ idCaixa: z.string().uuid() });

        const { idCaixa } = paramsSchema.parse(req.params);

        const caixa = await prisma.caixa.findUnique({
            where: { id: idCaixa },
            include: {
                Transacao: {
                    include: {
                        categoria: true
                    }
                }
            }
        });

        if (!caixa) return res.code(400).send({
            mensagem: "Caixa não existente."
        });

        return res.code(200).send(caixa);
    });

    app.post('/caixas', async (req, res) => {
        const caixaAberto = await prisma.caixa.findFirst({
            where: { closed: false }
        });

        if (!!caixaAberto) return res.code(400).send({
            mensagem: "Feche o caixa aberto para abrir outro."
        });

        const novoCaixa = await prisma.caixa.create({ data: {} });

        return res.code(200).send(novoCaixa);
    });

    app.put('/caixas/fechar/:idCaixa', async (req, res) => {
        const paramsSchema = z.object({ idCaixa: z.string().uuid() });
        const bodySchema = z.object({
            cashValue: z.number(),
            sealValue: z.number()
        });

        const { idCaixa } = paramsSchema.parse(req.params);
        const { cashValue, sealValue } = bodySchema.parse(req.body);

        const caixaExistente = await prisma.caixa.findUnique({
            where: { id: idCaixa }
        });

        if (!caixaExistente) return res.code(400).send({
            mensagem: "Caixa não existente."
        });

        const caixa = await prisma.caixa.update({
            where: { id: caixaExistente.id },
            data: {
                cashValue,
                sealValue,
                finishedIn: new Date()
            }
        });

        return res.code(200).send({
            mensagem: "Caixa fechado com sucesso.",
            caixa
        });
    });

    app.delete('/caixas/excluir/:idCaixa', async (req, res) => {
        const paramsSchema = z.object({ idCaixa: z.string().uuid() });

        const { idCaixa } = paramsSchema.parse(req.params);

        const caixaExistente = await prisma.caixa.findUnique({
            where: { id: idCaixa }
        });

        if (!caixaExistente) return res.code(400).send({
            mensagem: "Caixa não existente."
        });

        const caixa = await prisma.caixa.delete({
            where: { id: idCaixa }
        });

        return res.code(200).send({
            mensagem: "Caixa deletado com sucesso.",
            caixa
        });
    });
}