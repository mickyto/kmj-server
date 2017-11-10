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

            if (res === null) {
                resolve({error: 'Не удалось добавить нового клиента'});
                return;
            }

            resolve(res);
        });
    });
};

export { getClients, addClient };
