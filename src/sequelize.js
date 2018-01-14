import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const sequelize = new Sequelize(
    'kmj',
    'root',
    '',
    {
        host: 'mysql',
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
            underscored: true,
        },
        dialectOptions: {
            useUTC: false //for reading from database
        }
    }
);

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
    },
    login: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING
    }
});

const Clients = sequelize.define('clients', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'client_id'
    },
    fio: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    }
});

const Pupils = sequelize.define('pupils', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'pupil_id'
    },
    fio: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    class: {
        type: Sequelize.STRING
    },
    school: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

const Teachers = sequelize.define('teachers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'teacher_id'
    },
    fio: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.STRING
    },
    education: {
        type: Sequelize.STRING(1234)
    },
    description: {
        type: Sequelize.STRING(1234)
    }
});

const Groups = sequelize.define('groups', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'group_id'
    },
    title: {
        type: Sequelize.STRING,
    },
    daysOfWeek: {
        type: Sequelize.JSON ,
    }
});

const Formats = sequelize.define('formats', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'format_id'
    },
    title: {
        type: Sequelize.STRING,
    },
    priceForCycle: {
        type: Sequelize.STRING,
    },
    countOfLessons: {
        type: Sequelize.STRING,
    },
    duration: {
        type: Sequelize.STRING,
    }
});

const Subjects = sequelize.define('subjects', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    }
});

const Channels = sequelize.define('channels', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    }
});

const Trainings = sequelize.define('trainings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'training_id'
    },
    title: {
        type: Sequelize.STRING,
    },
    action: {
        type: Sequelize.STRING,
    },
    controller: {
        type: Sequelize.STRING,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active'
    },
    speed: {
        type: Sequelize.FLOAT
    },
    sort: {
        type: Sequelize.INTEGER
    }
});

const PupilTrainings = sequelize.define('pupil_trainings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tex: {
        type: Sequelize.STRING,
    },
    pupil_answer: {
        type: Sequelize.STRING,
    },
    right_answer: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.BOOLEAN,
    },
    date: {
        type: Sequelize.STRING,
    }
});

const Themes = sequelize.define('themes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    }
});

const TrainingGroups = sequelize.define('training_groups', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    }
});

const Tests = sequelize.define('tests', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'test_id'
    },
    cin: {
        type: Sequelize.STRING,
    },
    cout: {
        type: Sequelize.STRING,
    },
    sort: {
        type: Sequelize.INTEGER
    }
});

const Works = sequelize.define('works', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'work_id'
    },
    title: {
        type: Sequelize.STRING,
    },
    three: {
        type: Sequelize.INTEGER
    },
    four: {
        type: Sequelize.INTEGER
    },
    five: {
        type: Sequelize.INTEGER
    }
});

const WorkContents = sequelize.define('work_contents', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sort: {
        type: Sequelize.INTEGER,
    }
});

const WorkTrainings = sequelize.define('work_trainings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sort: {
        type: Sequelize.INTEGER,
    }
});

const GroupWorks = sequelize.define('group_works', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATE,
        field: 'given_at'
    }
});

const PupilWorkGrades = sequelize.define('pupil_work_grades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grade: {
        type: Sequelize.INTEGER,
    }
});

const WorkExecutions = sequelize.define('work_executions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    program: {
        type: Sequelize.STRING,
    },
    attempt: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.BOOLEAN,
    },
    date: {
        type: Sequelize.DATE,
    }
});

const Exercises = sequelize.define('exercises', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'exercise_id'
    },
    text: {
        type: Sequelize.STRING,
    },
    code: {
        type: Sequelize.STRING,
    }
});

Pupils.belongsTo(Clients);
Clients.belongsTo(Channels);
Groups.belongsTo(Teachers);
Groups.belongsTo(Subjects);
Groups.belongsTo(Formats);

Trainings.belongsTo(TrainingGroups);
TrainingGroups.belongsTo(Subjects);

Groups.belongsToMany(Pupils, { through: 'pupil_groups' });
Pupils.belongsToMany(Groups, { through: 'pupil_groups' });

Trainings.belongsToMany(Pupils, { through: 'pupil_trainings' });
Pupils.belongsToMany(Trainings, { through: 'pupil_trainings' });

Exercises.hasMany(Tests);
Exercises.belongsTo(Themes);

Works.belongsToMany(Exercises, { through: 'work_contents' });
Exercises.belongsToMany(Works, { through: 'work_contents' });

Works.belongsToMany(Trainings, { through: 'work_trainings' });
Trainings.belongsToMany(Works, { through: 'work_trainings' });

Pupils.belongsToMany(Exercises, { through: 'work_executions' });
Exercises.belongsToMany(Pupils, { through: 'work_executions' });

Pupils.belongsToMany(Works, { through: 'pupil_works', as: 'works' });
Works.belongsToMany(Pupils, { through: 'pupil_works', as: 'pupils' });

Pupils.belongsToMany(Works, { through: 'pupil_work_grades', as: 'tasks' });
Works.belongsToMany(Pupils, { through: 'pupil_work_grades', as: 'executors' });

Groups.belongsToMany(Works, { through: 'group_works' });
Works.belongsToMany(Groups, { through: 'group_works' });

export { Op, Users, Clients, Pupils, Teachers, Groups, Formats, Subjects, Channels, TrainingGroups,
    Trainings, PupilTrainings, Themes, Tests, Exercises, Works, WorkContents, WorkExecutions,
    WorkTrainings, PupilWorkGrades, GroupWorks };
