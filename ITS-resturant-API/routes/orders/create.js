import S from 'fluent-json-schema';
import { nanoid } from 'nanoid';

const order = S.object()
    .additionalProperties(false)
    .prop('tableId', S.string().required())
    .prop('dishes', S.array().default([]).items(
        S.object()
            .prop('id', S.number())
            .prop('qty', S.number())
    ));



const schema = {
    body: order,
    response: {
        200: order.extend(S.object().prop('id', S.string()))
    }
};

export default async function(app) {
    app.post('/', {schema}, async (res) => {
        const {tableId, dishes} = res.body;
        
        if(app.db.tables.findIndex(x => x.id === tableId) < 0) {
            throw new app.httpErrors.badRequest('Tavolo non valido');
        }

        if(app.db.orders.some(x => x.tableId === tableId && !x.completed)) {
            throw new app.httpErrors.badRequest('Tavolo già occupato');
        }

        const newOrder = {
            id: nanoid(), 
            tableId,
            dishes: app.aggregate(dishes),
            completed: false,
            timestamp: new Date().getTime()
        };

        app.db.orders.push(newOrder);
        return newOrder;
    });
}