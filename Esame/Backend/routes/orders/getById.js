import S from 'fluent-json-schema';


const schema = {
    params: S.object().prop('id', S.string()),
    response: {
        200: S.object()
            .prop('id', S.string())
            .prop('tableId', S.string())
            .prop('dishes', S.array().default([]).items(
                S.object()
                    .prop('id', S.number())
                    .prop('qty', S.number())
            ))
    }
};

export default async function(app) {
    app.get('/:id', {schema}, async (res) => {
        const match = app.db.orders.find(x => x.id === res.params.id)

        if(!match) {
            throw new app.httpErrors.notFound();
        }

        return match;

    });
}