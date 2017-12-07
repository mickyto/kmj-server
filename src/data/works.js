import { Works } from '../sequelize';

const getWorks = () => {
    return new Promise((resolve, reject) => {
        Works.findAll()
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

const getWorkExercises = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work.getExercises()))
            .catch(error => reject(error))
    })
};

const getWorkPupils = (id) => {
    return new Promise((resolve, reject) => {
        Works.findById(id)
            .then(work => resolve(work.getPupils()))
            .catch(error => reject(error))
    })
};

const addOrEditWork = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Works.update({ title: args.title }, { where: { work_id: args.id }})
                .then(work => {
                    work.setExercises(args.exercises);
                    work.setPupils(args.pupils);
                    resolve(work)
                })
                .catch(error => reject(error));
            return;
        }

        Works.create({ title: args.title })
            .then(work => {
                work.addPupils(args.pupils);
                work.addExercises(args.exercises);
                resolve(work)
            })
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

export { getWorks, getWork, getWorkExercises, getWorkPupils,  addOrEditWork, removeWork };
