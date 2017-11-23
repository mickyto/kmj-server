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
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
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
    dayOfWeek: {
        type: Sequelize.JSON ,
    },
    time: {
        type: Sequelize.STRING,
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


Pupils.belongsTo(Clients, { foreignKey: 'client_id' });
Clients.belongsTo(Channels, { foreignKey: 'channel_id' });
Groups.belongsTo(Teachers);
Groups.belongsTo(Subjects);
Groups.belongsTo(Formats);
Groups.belongsToMany(Pupils, { as: 'groups', through: 'pupil_group', foreignKey: 'group_id' });
Pupils.belongsToMany(Groups, { as: 'pupils', through: 'pupil_group', foreignKey: 'pupil_id' });

export { Op, Users, Clients, Pupils, Teachers, Groups, Formats, Subjects, Channels };
