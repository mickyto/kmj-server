import { Clients } from './models';

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

        Clients.create(args, (err, res) => {
            if (err) reject(err);

            if (!res) {
                resolve({error: 'Не удалось добавить нового клиента'});
                return;
            }

            resolve(res);
        });
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
            Clients.updateMany({ _id: { $in: ids }}, { $set: { status: 'trashed' }}, callback);
        }
        else if (operation === 'remove') {
            Clients.remove({ _id: { $in: ids }}, callback);
        }
        else if (operation === 'recovery') {
            Clients.updateMany({ _id: { $in: ids }}, { $unset: { status: 1 }}, callback);
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getClients, addClient, alterClients, getClient };
