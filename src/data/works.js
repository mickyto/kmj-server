import { Works, Op } from '../sequelize';

const getWorks = (ids) => {

    // TODO why I need conditional query?
    const query = ids ? { where: { work_id: { [Op.in]: ids }}} : {};
    return new Promise((resolve, reject) => {
        Works.findAll(query)
            .then(works => resolve(works))
            .catch(error => reject(error))
    })
};

const getWork = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work))
            .catch(error => reject(error))
    })
};

const addOrEditWork = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Works.update(args, { where: { work_id: args.id }})
                .then(work => resolve(work))
                .catch(error => reject(error));
            return;
        }

        Works.create(args)
            .then(work => resolve(work))
            .catch(error => reject(error));
    });
};

const removeWork = (id) => {
    return new Promise((resolve, reject) => {
        Works.destroy({ where: { work_id: id }})
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
};

export { getWorks, getWork, addOrEditWork, removeWork };
