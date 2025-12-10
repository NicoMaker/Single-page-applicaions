import fastify from "fastify";

import {join} from 'desm'
import fastifyAutoload from "@fastify/autoload";


const app = fastify({
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
});

await app.register(fastifyAutoload, {
  dir: join(import.meta.url, 'plugins'),
  encapsulate: false
});

await app.register(fastifyAutoload, {
  dir: join(import.meta.url, 'routes')
});

await app.listen({port: 8000});