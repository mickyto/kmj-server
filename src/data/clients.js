import { Clients, Pupils } from './models';

const getClients = (args) => {
    return new Promise((resolve, reject) => {

        let query;

        if (args && args === 'trashed') {
            query = { status : "trashed" }
        }
        else if (args === 'active') {
            query = { status : { $exists : false } }
        }
        else {
            query = {}
        }

        Clients.find(query, (err, clients) => {
            if (err) reject(err);
            else resolve(clients);
        })
    })
};

const getClient = (id) => {
    return new Promise((resolve, reject) => {

        Clients.findById(id, (err, client) => {
            if (err) reject(err);
            else resolve(client);
        })
    })
};

const addClient = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось добавить или изменить данные клиента'});
                return;
            }
            resolve(res);
        };

        if (args.id) {
            Clients.findOneAndUpdate({ _id: args.id }, args, callback)
        }
        else {
            Clients.create(args, callback);
        }
    });
};

const alterClients = ({ ids: { ids }, operation }) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Операция не удалась'});
                return;
            }
            resolve(res.result || res);
        };

        if (operation === 'move') {
            Clients.updateMany({ _id: { $in: ids }}, { $set: { status: 'trashed' }}, (err) => {
                if (err) reject(err);
                Pupils.updateMany({ clientId: { $in: ids }}, { $set: { status: 'trashed' }}, callback);
            });
        }
        else if (operation === 'remove') {
            Clients.remove({ _id: { $in: ids }}, (err) => {
                if (err) reject(err);
                Pupils.remove({ clientId: { $in: ids }}, callback);
            });
        }
        else if (operation === 'recovery') {
            Clients.updateMany({ _id: { $in: ids }}, { $unset: { status: 1 }}, (err) => {
                if (err) reject(err);
                Pupils.updateMany({ clientId: { $in: ids }}, { $unset: { status: 1 }}, callback);
            });
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getClients, addClient, alterClients, getClient };
