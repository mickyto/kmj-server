import { Themes, Channels, Subjects, TrainingGroups } from '../sequelize';

const getEntity = (kind) => {
    if (kind == 'themes')
        return Themes;
    else if (kind == 'channels')
        return Channels;
    else if (kind == 'subjects')
        return Subjects;
    else if (kind == 'training_groups')
        return TrainingGroups;
};

const getItems = (kind) => {
    const Items = getEntity(kind);
    return new Promise((resolve, reject) => {
        Items.findAll()
            .then(items => resolve(items))
            .catch(error => reject(error))
    })
};

const getItem = (args) => {
    const Items = getEntity(args.kind);
    return new Promise((resolve, reject) => {
        Items.findById(args.id)
            .then(item => resolve(item))
            .catch(error => reject(error))
    })
};

const setItem = (args) => {
    return new Promise((resolve, reject) => {

        const Items = getEntity(args.kind);

        if (args.id) {
            Items.update({ title: args.title }, { where: { id: args.id }})
                .then(item => resolve(item))
                .catch(error => reject(error));
            return;
        }

        Items.create({ title: args.title })
            .then(item => resolve(item))
            .catch(error => reject(error));
    });
};

const removeItem = (args) => {
    return new Promise((resolve, reject) => {
        const Items = getEntity(args.kind);
        Items.destroy({ where: { id: args.id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getItems, getItem, setItem, removeItem };


