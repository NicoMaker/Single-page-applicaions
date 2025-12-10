import fastifyCors from "@fastify/cors";

export default async function(app, opts) {
    await app.register(fastifyCors);
}