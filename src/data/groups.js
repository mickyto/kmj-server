import { Groups } from '../sequelize';

const getGroups = () => {
    return new Promise((resolve, reject) => {
        Groups.findAll()
            .then(groups => resolve(groups))
            .catch(error => reject(error))
    })
};

const getGroup = (id) => {
    return new Promise((resolve, reject) => {
        Groups.findById(id)
            .then(group => resolve(group))
            .catch(error => reject(error))
    })
};

const addOrEditGroup = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Groups.update(args, { where: { group_id: args.id }})
                .then(group => resolve(group))
                .catch(error => reject(error));
            return;
        }

        Groups.create(args)
            .then(group => resolve(group))
            .catch(error => reject(error));
    });
};

const removeGroup = (id) => {
    return new Promise((resolve, reject) => {
        Groups.destroy({ where: { group_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getGroups, getGroup, addOrEditGroup, removeGroup };
