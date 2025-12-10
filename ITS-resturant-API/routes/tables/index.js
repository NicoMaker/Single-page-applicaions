import S from 'fluent-json-schema';


const schema = {
    response: {
        200: S.array().items(S.object()
            .prop('id', S.string())
            .prop('nome', S.string())
        )
    }
};

export default async function(app) {
    app.get('/', {schema}, async () => app.db.tables);
}