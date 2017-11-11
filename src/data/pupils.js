import { Pupils } from './models';

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
            resolve(res.result || res);
        };

        if (operation === 'move') {
            Pupils.updateMany({ _id: { $in: ids }}, { $set: { status: 'trashed' }}, callback);
        }
        else if (operation === 'remove') {
            Pupils.remove({ _id: { $in: ids }}, callback);
        }
        else if (operation === 'recovery') {
            Pupils.updateMany({ _id: { $in: ids }}, { $unset: { status: 1 }}, callback);
        }
        else {
            resolve({error: 'Ошибка операции'});
        }
    });
};

export { getPupils, addPupil, alterPupils, getPupil, getPupilByClientId };
