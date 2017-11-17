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

const addOrEditPupil = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, pupil) => {
            if (err) reject(err);
            if (!pupil) {
                resolve({error: 'Не удалось добавить или изменить данные ученика'});
                return;
            }
            resolve(pupil);
        };

        if (args.id) {
            Pupils.findOneAndUpdate({ _id: args.id }, args, callback)
        }
        else if (!args.clientId) {
            resolve({error: 'Ошибка. Вы пытаетесь создать ученика без клиента'});
        }
        else {
            Pupils.create(args, callback);
        }
    });
};

const movePupil = ({ id, operation }) => {
    return new Promise((resolve, reject) => {

        if (operation === 'move') {
            Pupils.findOneAndUpdate({ _id: id }, { $set: { status: 'trashed' }}, (err, pupil) => {
                if (err) reject(err);
                Clients.update({ _id: pupil.clientId }, { $set: { status: 'trashed' }}, (err) => {
                    if (err) reject(err);
                    resolve({ ok: 1 });
                });
            });
        }
        else if (operation === 'recovery') {
            Pupils.findOneAndUpdate({ _id: id }, { $unset: { status: 1 }}, (err, pupil) => {
                if (err) reject(err);
                Clients.update({ _id: pupil.clientId }, { $unset: { status: 1 }}, (err) => {
                    if (err) reject(err);
                    resolve({ ok: 1 });
                });
            });
        }
        else if (operation === 'remove') {
            Pupils.findById(id, (err, pupil) => {
                if (err) reject(err);
                Pupils.remove({ _id: pupil._id }, (err) => {
                    if (err) reject(err);
                    Clients.remove({ _id: pupil.clientId }, (err) => {
                        if (err) reject(err);
                        resolve({ ok: 1 });
                    });
                });
            });
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getPupils, getPupil, addOrEditPupil, movePupil, getPupilByClientId };
