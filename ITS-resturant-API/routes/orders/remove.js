import S from 'fluent-json-schema';

const schema = {
    params: S.object().prop('id', S.string())
};

export default async function(app) {
    app.delete('/:id', {schema}, async (req, res) => {
        const index = app.db.orders.findIndex(x => x.id === req.params.id);

        if(index < 0) {
            throw new app.httpErrors.notFound();
        }

        app.db.orders[index].completed = true;
        return res.code(204).send();
    });
}