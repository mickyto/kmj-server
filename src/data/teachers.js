import { Teachers } from '../sequelize';

const getTeachers = () => {
    return new Promise((resolve, reject) => {
        Teachers.findAll()
            .then(teachers => resolve(teachers))
            .catch(error => reject(error))
    })
};

const getTeacher = (id) => {
    return new Promise((resolve, reject) => {
        Teachers.findById(id)
            .then(teacher => resolve(teacher))
            .catch(error => reject(error))
    })
};

const addOrEditTeacher = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Teachers.update(args, { where: { teacher_id: args.id }})
                .then(teacher => resolve(teacher))
                .catch(error => reject(error));
            return;
        }

        Teachers.create(args)
            .then(teacher => resolve(teacher))
            .catch(error => reject(error));
    });
};

export { getTeachers, getTeacher, addOrEditTeacher };
