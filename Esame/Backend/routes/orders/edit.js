import S from 'fluent-json-schema';

const order = S.object()
    .additionalProperties(false)
    .prop('dishes', S.array().default([]).items(
        S.object()
            .prop('id', S.number())
            .prop('qty', S.number())
    ));



const schema = {
    params: S.object().prop('id', S.string()),
    body: order,
    response: {
        200: order.extend(S.object()
            .prop('tableId', S.string().required())
            .prop('id', S.string())
        )
    }
};

export default async function(app) {
    app.put('/:id', {schema}, async (res) => {
        const {id} = res.params;
        const index = app.db.orders.findIndex(x => x.id === id);
        const order = app.db.orders[index];
        order.dishes = app.aggregate(res.body.dishes);
        app.db.orders[index] = order;
        return order;
    });
}