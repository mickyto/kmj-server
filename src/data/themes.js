import { Themes, Op } from '../sequelize';

const getThemes = (ids) => {

    // TODO why I need conditional query?
    const query = ids ? { where: { theme_id: { [Op.in]: ids }}} : {};
    return new Promise((resolve, reject) => {
        Themes.findAll(query)
            .then(themes => resolve(themes))
            .catch(error => reject(error))
    })
};

const getTheme = (id) => {
    return new Promise((resolve, reject) => {
        Themes.findById(id)
            .then(theme => resolve(theme))
            .catch(error => reject(error))
    })
};

const addOrEditTheme = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Themes.update(args, { where: { theme_id: args.id }})
                .then(theme => resolve(theme))
                .catch(error => reject(error));
            return;
        }

        Themes.create(args)
            .then(theme => resolve(theme))
            .catch(error => reject(error));
    });
};

const removeTheme = (id) => {
    return new Promise((resolve, reject) => {
        Themes.destroy({ where: { theme_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getThemes, getTheme, addOrEditTheme, removeTheme };
