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
            timestamps: false
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
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    channel_id: {
        type: Sequelize.INTEGER
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
}, { underscored: true });

const Pupils = sequelize.define('pupils', {
    clientId: Number,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'pupil_id'
    },
    fio: {
        type: Sequelize.STRING
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
}, { underscored: true });

Pupils.belongsTo(Clients);

export { Op, Users, Clients, Pupils };
