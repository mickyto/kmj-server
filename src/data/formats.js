import { Formats } from '../models';

const getFormats = (ids) => {

    const query = ids ? { _id: { $in: ids }} : {};
    return new Promise((resolve, reject) => {
        Formats.find(query, (err, formats) => {
            if (err) reject(err);
            else resolve(formats);
        })
    })
};

const addOrEditFormat = (args) => {
    return new Promise((resolve, reject) => {

        const callback = (err, format) => {
            if (err) reject(err);
            if (!format) {
                resolve({error: 'Не удалось изменить или создать новый формат'});
            }
            resolve(format);
        };

        if (args.id) {
            Formats.findOneAndUpdate({ _id: args.id }, callback)
        }

        Formats.create(args, callback);
    });
};

const removeFormat = (id) => {
    return new Promise((resolve, reject) => {
        Formats.findOneAndRemove({ _id: id }, (err, result) => {
            if (err) reject(err);
            if (!result) {
                resolve({error: 'Не удалось удалить формат'});
                return;
            }
            resolve(result);
        })
    })
};

export { getFormats, addOrEditFormat, removeFormat };
