import { Groups, Works, GroupWorks } from '../sequelize';

const getGroups = () => {
    return new Promise((resolve, reject) => {
        Groups.findAll()
            .then(groups => resolve(groups))
            .catch(error => reject(error))
    })
};

const getGroup = (id) => {
    return new Promise((resolve, reject) => {
        Groups.findById(id)
            .then(group => resolve(group))
            .catch(error => reject(error))
    })
};

const getGroupPupils = (id, work, pupil) => {
    return new Promise((resolve, reject) => {
        Groups.findById(id)
            .then(group => {
                
                if (work) {
                    const query = { include: [{ model: Works, as: 'tasks', where: { id: work.work_id }}]};
                    if (pupil)
                        query.where = { id: pupil };

                    return resolve(group.getPupils(query));
                }
                return resolve(group.getPupils())
            })
            .catch(error => reject(error))
    })
};

const getGroupWorkDate = ({ id, work }) => {
    return new Promise((resolve, reject) => {
        GroupWorks.findOne({ where: { group_id: id, work_id: work }})
            .then(item => resolve(item.date))
            .catch(error => reject(error))
    })
};

const addOrEditGroup = (args) => {
    return new Promise((resolve, reject) => {

        if (args.id) {
            Groups.update(args, { where: { group_id: args.id }})
                .then(group => resolve(group))
                .catch(error => reject(error));
            return;
        }

        Groups.create(args)
            .then(group => resolve(group))
            .catch(error => reject(error));
    });
};

export { getGroups, getGroup, getGroupPupils, addOrEditGroup, getGroupWorkDate };
