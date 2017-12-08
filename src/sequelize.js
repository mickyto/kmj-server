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
        },
        timezone: '+03:00'
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
        autoIncrement: true,
        field: 'subject_id'
    },
    name: {
        type: Sequelize.STRING,
    }
});

const Channels = sequelize.define('channels', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'channel_id'
    },
    name: {
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
    url: {
        type: Sequelize.STRING,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active'
    },
    speed: {
        type: Sequelize.INTEGER
    }
});

const PupilTrainings = sequelize.define('pupil_trainings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
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
    date: {
        type: Sequelize.STRING,
    }
});

const Themes = sequelize.define('themes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'theme_id'
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
    }
});

const WorkContents = sequelize.define('work_contents', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    sort: {
        type: Sequelize.INTEGER,
    }
});

const WorkExecutions = sequelize.define('work_executions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    program: {
        type: Sequelize.STRING,
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
    }
});

Pupils.belongsTo(Clients, { foreignKey: 'client_id' });
Clients.belongsTo(Channels, { foreignKey: 'channel_id' });
Groups.belongsTo(Teachers);
Groups.belongsTo(Subjects);
Groups.belongsTo(Formats);
Groups.belongsToMany(Pupils, { through: 'pupil_groups' });
Pupils.belongsToMany(Groups, { through: 'pupil_groups' });
Trainings.belongsTo(Subjects);
Trainings.belongsToMany(Pupils, { through: 'pupil_trainings' });
Pupils.belongsToMany(Trainings, { through: 'pupil_trainings' });
Exercises.hasMany(Tests);
Exercises.belongsTo(Themes);

Works.belongsToMany(Exercises, {  through: 'work_contents' });
Exercises.belongsToMany(Works, {  through: 'work_contents' });

Pupils.belongsToMany(Exercises, { through: 'work_executions' });
Exercises.belongsToMany(Pupils, { through: 'work_executions' });

Pupils.belongsToMany(Works, { through: 'pupil_works' });
Works.belongsToMany(Pupils, { through: 'pupil_works' });

export { Op, Users, Clients, Pupils, Teachers, Groups, Formats, Subjects, Channels,
    Trainings, PupilTrainings, Themes, Tests, Exercises, Works, WorkContents, WorkExecutions };
