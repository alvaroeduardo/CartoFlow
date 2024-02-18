import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export async function transacao(app: FastifyInstance) {
    app.post('/transacoes/:idCaixa', async (req, res) => {
        const paramsSchema = z.object({ idCaixa: z.string() });
        const bodySchema = z.object({
            idCategoria: z.string(),
            description: z.string(),
            input: z.boolean(),
            value: z.number()            
        });

        const { idCaixa } = paramsSchema.parse(req.params);
        const { idCategoria, input, value, description } = bodySchema.parse(req.body);

        const caixa = await prisma.caixa.findUnique({
            where: { id: idCaixa }
        });

        const categoria = await prisma.categoria.findUnique({
            where: { id: idCategoria }
        });

        if (!caixa) return res.code(400).send({ mensagem: "Caixa não encontrado." });
        if (!categoria) return res.code(400).send({ mensagem: "Categoria não encontrada" });

        const transacao = await prisma.transacao.create({
            data: { idCaixa, idCategoria, input, value, description }
        });

        return res.code(200).send({
            mensagem: `Nova ${input === true ? "entrada" : "saída"} adicionada com sucesso.`,
            transacao
        });
    });

    app.delete('/transacoes/:idTransacao', async (req, res) => {
        const paramsSchema = z.object({ idTransacao: z.string() });

        const { idTransacao } = paramsSchema.parse(req.params);

        const transacao = await prisma.transacao.findUnique({
            where: { id: idTransacao }
        });

        if (!transacao) return res.code(400).send({ mensagem: "Transação não encontrada." });

        await prisma.transacao.delete({
            where: { id: transacao.id }
        });

        return res.code(200).send({ mensagem: "Transação excluída com sucesso." });
    });
}