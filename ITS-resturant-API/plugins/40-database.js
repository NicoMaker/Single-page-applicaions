import {readFile} from 'node:fs/promises';


function createTables() {
    const tables = [];

    for(let i = 0; i < 12; i++) {
        tables.push({
            id: `T${i + 1}`,
            nome: `Tavolo ${i + 1}`
        });
    }

    for(let i = 0; i < 5; i++) {
        tables.push({
            id: `E${i + 1}`,
            nome: `Esterno ${i + 1}`
        });
    }

    return Promise.resolve(tables);
}

async function createDishes() {
    const dishes = await readFile('./data/dishes.json');
    return JSON.parse(dishes);
}


export default async function(app, opts) {

    app.decorate('db', {
        tables: await createTables(),
        dishes: await createDishes(),
        orders: []
    });

    app.decorate('aggregate', function(dishes) {
        const dishesIds = app.db.dishes.map(x => x.id);
        
        if(dishes.some(x => !dishesIds.includes(x.id))) {
            throw new app.httpErrors.badRequest('Piatto non valido');
        }

        const tmp = Object.groupBy(dishes, x => x.id);
        return Object.keys(tmp).map(id => ({id: +id, qty: tmp[id].reduce((a, x) => a + x.qty, 0)}));
    });
}