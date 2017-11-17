import { Channels } from '../models';

const getChannels = (ids) => {

    // TODO why I need conditional query?
    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Channels.find(query, (err, channels) => {
            if (err) reject(err);
            else resolve(channels);
        })
    })
};

const addOrEditChannel = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, channel) => {
            if (err) reject(err);
            if (!channel) {
                resolve({error: 'Не удалось изменить или создать новый канал привлечения'});
            }
            resolve(channel);
        };

        if (args.id) {
            Channels.findOneAndUpdate({ _id: args.id }, args, callback);
            return;
        }

        Channels.create(args, callback);
    });
};

const removeChannel = (id) => {
    return new Promise((resolve, reject) => {
        Channels.findOneAndRemove({ _id: id }, (err, result) => {
            if (err) reject(err);
            if (!result) {
                resolve({error: 'Не удалось удалить канал привлечения'});
                return;
            }
            resolve(result);
        })
    })
};

export { getChannels, addOrEditChannel, removeChannel };
