import { Groups } from '../models';

const getGroups = (ids) => {

    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Groups.find(query, (err, groups) => {
            if (err) reject(err);
            else resolve(groups);
        })
    })
};

const getGroup = (id) => {
    return new Promise((resolve, reject) => {
        Groups.findById(id, (err, group) => {
            if (err) reject(err);
            else resolve(group);
        })
    })
};

const addOrEditGroup = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, group) => {
            if (err) reject(err);
            if (!group) {
                resolve({error: 'Не удалось изменить или создать новую группу'});
            }
            resolve(group);
        };

        if (args.id) {
            Groups.findOneAndUpdate({ _id: args.id }, args, callback);
            return;
        }

        Groups.create(args, callback);
    });
};

const removeGroup = (id) => {
    return new Promise((resolve, reject) => {
        Groups.findOneAndRemove({ _id: id }, (err, result) => {
            if (err) reject(err);
            if (!result) {
                resolve({error: 'Не удалось удалить группу'});
                return;
            }
            resolve(result);
        })
    })
};

export { getGroups, getGroup, addOrEditGroup, removeGroup };
