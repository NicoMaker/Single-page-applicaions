import S from 'fluent-json-schema';


const schema = {
    response: {
        200: S.array().items(S.object()
            .prop('id', S.number())
            .prop('nome', S.string())
            .prop('categoria', S.string())
            .prop('prezzo', S.number())
            .prop('descrizione', S.string())
            .prop('vegetariano', S.boolean())
        )
    }
};

export default async function(app) {
    app.get('/', {schema}, async () => {
        return app.db.dishes;
    });
}