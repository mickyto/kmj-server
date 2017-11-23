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
    groups: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    school: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    client_id: {
        type: Sequelize.INTEGER
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


Pupils.belongsTo(Clients);
Clients.belongsTo(Channels);

export { Op, Users, Clients, Pupils, Teachers, Formats, Subjects, Channels };
