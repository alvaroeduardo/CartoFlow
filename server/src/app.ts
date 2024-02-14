import fastify from "fastify";
import { caixa } from "./routes/caixas.route";
import { transacao } from "./routes/transacoes.route";
import { categoria } from "./routes/categorias.route";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
    origin: "*"
});

app.register(caixa);
app.register(transacao);
app.register(categoria);

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server started successfully 🔥");
});