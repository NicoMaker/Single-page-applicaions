import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export default async function(app, opts) {
    await app.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
            title: 'ITS resturant API',
            description: 'Demo API for ITS resturant',
            version: '1.0.0'
            },
            servers: [
                {
                    url: 'http://localhost:8000',
                    description: 'Development server'
                }
            ]
        }
    });

    await app.register(fastifySwaggerUi);
}