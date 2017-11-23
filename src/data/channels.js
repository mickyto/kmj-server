import { Channels, Op } from '../sequelize';

const getChannels = (ids) => {

    // TODO why I need conditional query?
    const query = ids ? { where: { channel_id: { [Op.in]: ids }}} : {};
    return new Promise((resolve, reject) => {
        Channels.findAll(query)
            .then(channels => resolve(channels))
            .catch(error => reject(error))
    })
};

const addOrEditChannel = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Channels.update(args, { where: { channel_id: args.id }})
                .then(channel => resolve(channel))
                .catch(error => reject(error));
            return;
        }

        Channels.create(args)
            .then(channel => resolve(channel))
            .catch(error => reject(error));
    });
};

const removeChannel = (id) => {
    return new Promise((resolve, reject) => {
        Channels.destroy({ where: { channel_id: id }})
            .then(channel_id => {
                resolve(channel_id)
            })
            .catch(error => reject(error));
    })
};

export { getChannels, addOrEditChannel, removeChannel };
