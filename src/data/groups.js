import { Groups } from './models';

const getGroups = (ids) => {

    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Groups.find(query, (err, groups) => {
            if (err) reject(err);
            else resolve(groups);
        })
    })
};


const removeGroup = (id) => {
    return new Promise((resolve, reject) => {
        Groups.findOneAndRemove({ _id: id }, (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось добавить или удалить предмет'});
                return;
            }
            resolve(res);
        })
    })
};

const groupCrud = (args) => {
    return new Promise((resolve, reject) => {
        Groups.create(args, (err, res) => {
            if (err) reject(err);
            if (!res) {
                resolve({error: 'Не удалось добавить или удалить предмет'});
                return;
            }
            resolve(res);
        });
    });
};

export { groupCrud, getGroups, removeGroup };
