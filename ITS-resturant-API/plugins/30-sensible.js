import fastifySensible from "@fastify/sensible";

export default async function(app, opts) {
    await app.register(fastifySensible);
}