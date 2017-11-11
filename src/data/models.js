import mongoose from 'mongoose';
import config from "../../config";
import autoIncrement from'mongoose-auto-increment';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);
autoIncrement.initialize(db);

const clientSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    fio: String,
    email: String,
    phone: String,
    where_from: String,
    status: String,
});
clientSchema.plugin(autoIncrement.plugin, {
    model: 'Clients',
    startAt: 1
});

const pupilSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    fio: String,
    email: String,
    phone: String,
    class: Number,
    subjects: Object,
    school: String,
    status: String,
    clientId: Number
});
pupilSchema.plugin(autoIncrement.plugin, {
    model: 'Pupils',
    startAt: 1
});

const userSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    login: String,
    email: String,
    password: String,
    role: String,
});
userSchema.plugin(autoIncrement.plugin, {
    model: 'Users',
    startAt: 3
});

const subjectSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    name: String,
});
subjectSchema.plugin(autoIncrement.plugin, {
    model: 'Subjects',
    startAt: 1
});


const Clients = db.model('Clients', clientSchema);
const Pupils = db.model('Pupils', pupilSchema);
const Users = db.model('Users', userSchema);
const Subjects = db.model('Subjects', subjectSchema);


export { Users, Clients, Pupils, Subjects }
