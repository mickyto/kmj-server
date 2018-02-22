import { Clients, Pupils, Channels } from '../sequelize';

const getClients = show => new Promise((resolve, reject) => {

    let query = { include: [
        { model: Channels, attributes: ['id', 'title']},
        { model: Pupils, attributes: ['id', 'fio']}
    ]};

    if (show && show === 'trashed')
        query.where = { status : 'trashed' };
    else if (show === 'active')
        query.where = { status : null };

    Clients.findAll(query)
        .then(clients => resolve(clients))
        .catch(error => reject(error));
});

const getClient = id => new Promise((resolve, reject) => {
    Clients.findById(id, { include: [
        { model: Channels, attributes: ['title']},
        { model: Pupils, attributes: ['id', 'fio']}
    ]})
        .then(client => resolve(client))
        .catch(error => reject(error));
});

const addOrEditClient = args => new Promise((resolve, reject) => {

    if (args.id) {
        Clients.update(args, { where: { client_id: args.id }})
            .then(client => resolve(client))
            .catch(error => reject(error));
        return;
    }

    Clients.create(args)
        .then(client => resolve(client))
        .catch(error => reject(error));
});

const moveClients = ({ id, operation }) => new Promise((resolve, reject) => {

    if (operation === 'move')
        Clients.update({ status: 'trashed' }, { where: { client_id: id }})
            .then(client => {
                Pupils.update({ status: 'trashed' }, { where: { client_id: client.id }})
                    .then(result => resolve(result));
            })
            .catch(error => reject(error));
    else if (operation === 'remove')
        Clients.destroy({ where: { client_id: id }})
            .then(client => {
                Pupils.destroy({ where: { client_id: client.id }})
                    .then(result => resolve(result));
            })
            .catch(error => reject(error));
    else if (operation === 'recovery')
        Clients.update({ status: null }, { where: { client_id: id }})
            .then(client => {
                Pupils.update({ status: null }, { where: { client_id: client.id }})
                    .then(result => resolve(result));
            })
            .catch(error => reject(error));
});

export { getClients, getClient, addOrEditClient, moveClients };
