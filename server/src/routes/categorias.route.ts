import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export async function categoria(app: FastifyInstance) {
    app.post('/categorias', async (req, res) => {
        const bodySchema = z.object({ title: z.string() });
        
        const { title } = bodySchema.parse(req.body);

        const categoria = await prisma.categoria.create({
            data: { title }
        });

        return res.code(200).send({
            mensagem: "Categoria adicionada com sucesso.",
            categoria
        });
    });

    app.delete('/categorias/:idCategoria', async (req, res) => {
        const paramsSchema = z.object({ idCategoria: z.string() });

        const { idCategoria } = paramsSchema.parse(req.params);

        const categoria = await prisma.categoria.findUnique({
            where: { id: idCategoria }
        });

        if(!categoria) return res.code(400).send({ mensagem: "Categoria não encontrada." });

        await prisma.categoria.delete({
            where: { id: categoria.id }
        });

        return res.code(200).send({ mensagem: "Categoria deletada com sucesso." });
    });
}