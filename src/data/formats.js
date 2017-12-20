import { Formats, Op } from '../sequelize';

const getFormats = (ids) => {

    const query = ids ? { where: { format_id: { [Op.in]: ids }}} : {};
    return new Promise((resolve, reject) => {
        Formats.findAll(query)
            .then(formats => resolve(formats))
            .catch(error => reject(error))
    })
};

const addOrEditFormat = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Formats.update(args, { where: { format_id: args.id }})
                .then(format => resolve(format))
                .catch(error => reject(error));
            return;
        }

        Formats.create(args)
            .then(format => resolve(format))
            .catch(error => reject(error));
    });
};

export { getFormats, addOrEditFormat };
