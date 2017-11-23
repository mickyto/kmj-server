import { Subjects, Op } from '../sequelize';

const getSubjects = (ids) => {

    // TODO why I need conditional query?
    const query = ids ? { where: { subject_id: { [Op.in]: ids }}} : {};
    return new Promise((resolve, reject) => {
        Subjects.findAll(query)
            .then(subjects => resolve(subjects))
            .catch(error => reject(error))
    })
};

const getSubject = (id) => {
    return new Promise((resolve, reject) => {
        Subjects.findById(id)
            .then(subject => resolve(subject))
            .catch(error => reject(error))
    })
};

const addOrEditSubject = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Subjects.update(args, { where: { subject_id: args.id }})
                .then(subject => resolve(subject))
                .catch(error => reject(error));
            return;
        }

        Subjects.create(args)
            .then(subject => resolve(subject))
            .catch(error => reject(error));
    });
};

const removeSubject = (id) => {
    return new Promise((resolve, reject) => {
        Subjects.destroy({ where: { subject_id: id }})
            .then(subject_id => {
                resolve(subject_id)
            })
            .catch(error => reject(error));
    })
};

export { getSubjects, getSubject, addOrEditSubject, removeSubject };
