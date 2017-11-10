import { Clients } from './models';

const getClients = () => {
    return new Promise((resolve, reject) => {
        Clients.find((err, client) => {
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

const moveClient = ({ ids }) => {
    return new Promise((resolve, reject) => {

        Clients.updateMany({ _id: { $in: ids }}, { $set: { status: 'trashed' }}, { new: true }, (err, res) => {
            if (err) reject(err);

            if (!res) {
                resolve({error: 'Не удалось переместить клиента'});
                return;
            }

            resolve(res);
        });
    });
};

export { getClients, addClient, moveClient };
