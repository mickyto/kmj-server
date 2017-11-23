import { Clients, Pupils } from '../sequelize';

const getClients = (args) => {
    return new Promise((resolve, reject) => {

        let query;

        if (args && args === 'trashed') {
            query = { where: { status : "trashed" }}
        }
        else if (args === 'active') {
            query = { where: { status : null }}
        }
        else {
            query = {}
        }

        Clients.findAll(query)
            .then(clients => resolve(clients))
            .catch(error => reject(error));
    })
};

const getClient = (id) => {
    return new Promise((resolve, reject) => {
        Clients.findById(id)
            .then(client => resolve(client))
            .catch(error => reject(error));
    })
};

const addOrEditClient = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Clients.update(args, { where: { client_id: args.id }})
                .then(client => resolve(client))
                .catch(error => reject(error));
        }
        else {
            Clients.create(args)
                .then(client => resolve(client))
                .catch(error => reject(error));
        }
    });
};

const moveClients = ({ id, operation }) => {
    return new Promise((resolve, reject) => {

        if (operation === 'move') {
            Clients.update({ status: 'trashed' }, { where: { client_id: id }})
                .then(client => {
                    Pupils.update({ status: 'trashed' }, { where: { client_id: client.id }})
                        .then(result => resolve(result));
                })
                .catch(error => reject(error));
        }
        else if (operation === 'remove') {
            Clients.destroy({ where: { client_id: id }})
                .then(client => {
                    Pupils.destroy({ where: { client_id: client.id }})
                        .then(result => resolve(result));
                })
                .catch(error => reject(error));
        }
        else if (operation === 'recovery') {
            Clients.update({ status: null }, { where: { client_id: id }})
                .then(client => {
                    Pupils.update({ status: null }, { where: { client_id: client.id }})
                        .then(result => resolve(result));
                })
                .catch(error => reject(error));
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getClients, getClient, addOrEditClient, moveClients };
