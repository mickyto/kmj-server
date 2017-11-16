import { Pupils, Clients } from '../models';

const getPupils = (args) => {
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

        Pupils.find(query, (err, pupils) => {
            if (err) reject(err);
            else resolve(pupils);
        })
    })
};

const getPupil = (id) => {
    return new Promise((resolve, reject) => {

        Pupils.findById(id, (err, pupil) => {
            if (err) reject(err);
            else resolve(pupil);
        })
    })
};

const getPupilByClientId = (id) => {
    return new Promise((resolve, reject) => {

        Pupils.findOne({ clientId: id }, (err, pupil) => {
            if (err) reject(err);
            else resolve(pupil);
        })
    })
};

const addPupil = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось добавить или изменить данные ученика'});
                return;
            }
            resolve(res);
        };

        if (args.id) {
            Pupils.findOneAndUpdate({ _id: args.id }, args, callback)
        }
        else {
            Pupils.create(args, callback);
        }
    });
};

const alterPupils = ({ ids: { ids }, operation }) => {
    return new Promise((resolve, reject) => {

        const callback = (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Операция не удалась'});
                return;
            }

            if (operation === 'move') {
                Pupils.update({ _id: res._id }, { $set: { status: 'trashed' }}, (err) => {
                    if (err) reject(err);
                    Clients.update({ _id: res.clientId }, { $set: { status: 'trashed' }}, (err) => {
                        if (err) reject(err);
                        resolve({ ok: 1 });
                    });
                });
            }
            else if (operation === 'recovery') {
                Pupils.update({ _id: res._id }, { $unset: { status: 1 }}, (err) => {
                    if (err) reject(err);
                    Clients.update({ _id: res.clientId }, { $unset: { status: 1 }}, (err) => {
                        if (err) reject(err);
                        resolve({ ok: 1 });
                    });
                });
            }
            else if (operation === 'remove') {
                Pupils.remove({ _id: res._id }, (err) => {
                    if (err) reject(err);
                    Clients.remove({ _id: res.clientId }, (err) => {
                        if (err) reject(err);
                        resolve({ ok: 1 });
                    });
                });
            }
            else {
                resolve({error: 'Ошибка операции'});
            }
        };

        for (let i = 0; i < ids.length; i++) {
            Pupils.findById(ids[i], callback)
        }
    });
};

export { getPupils, addPupil, alterPupils, getPupil, getPupilByClientId };
