import { Clients, Pupils } from '../models';

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

const addOrEditClient = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, client) => {
            if (err) reject(err);
            if (!client) {
                resolve({error: 'Не удалось добавить или изменить данные клиента'});
                return;
            }
            console.log(client)
            resolve(client);
        };

        if (args.id) {
            Clients.findOneAndUpdate({ _id: args.id }, args, callback)
        }
        else {
            Clients.create(args, callback);
        }
    });
};

const moveClients = ({ id, operation }) => {
    return new Promise((resolve, reject) => {

        const callback = (err, client) => {
            if (err) reject(err);
            if (!client) {
                resolve({error: 'Клиент не найден'});
                return;
            }
            resolve(client.result || client);
        };

        if (operation === 'move') {
            Clients.update({ _id: id }, { $set: { status: 'trashed' }}, (err) => {
                if (err) reject(err);
                Pupils.update({ clientId: id }, { $set: { status: 'trashed' }}, callback);
            });
        }
        else if (operation === 'remove') {
            Clients.remove({ _id: id }, (err) => {
                if (err) reject(err);
                Pupils.remove({ clientId: id }, callback);
            });
        }
        else if (operation === 'recovery') {
            Clients.update({ _id: id }, { $unset: { status: 1 }}, (err) => {
                if (err) reject(err);
                Pupils.update({ clientId: id }, { $unset: { status: 1 }}, callback);
            });
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getClients, getClient, addOrEditClient, moveClients };
