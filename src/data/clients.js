import { Clients } from './models';

const gerClients = () => {
    return new Promise((resolve, reject) => {
        Clients.find((err, clients) => {
            if (err) reject(err);
            else resolve(clients)
        })
    })
};

export { gerClients };
