import mongoose from 'mongoose';
import autoIncrement from'mongoose-auto-increment';
import config from "../config";

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const db = mongoose.createConnection(`mongodb://${config.mongoHost}/${config.mongoName}`);
autoIncrement.initialize(db);


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

const clientSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    fio: String,
    phone: String,
    email: String,
    where_from: String,
    location: String,
    description: String,
    status: String
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

const groupSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    name: String,
    teacherId: Number
});
groupSchema.plugin(autoIncrement.plugin, {
    model: 'Groups',
    startAt: 1
});

const teacherSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    fio: String,
    email: String,
    phone: String,
    subjects: Object
});
teacherSchema.plugin(autoIncrement.plugin, {
    model: 'Teachers',
    startAt: 1
});

const formatSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    title: String,
    priceForCycle: Number,
    countOfLessons: Number,
    duration: Object
});
formatSchema.plugin(autoIncrement.plugin, {
    model: 'Formats',
    startAt: 1
});

const subjectSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    name: String,
});
subjectSchema.plugin(autoIncrement.plugin, {
    model: 'Subjects',
    startAt: 1
});

const channelSchema = new Schema({
    _id: { type: Number, ref: 'id' },
    name: String,
});
channelSchema.plugin(autoIncrement.plugin, {
    model: 'Channels',
    startAt: 1
});

const Users = db.model('Users', userSchema);
const Clients = db.model('Clients', clientSchema);
const Pupils = db.model('Pupils', pupilSchema);
const Groups = db.model('Groups', groupSchema);
const Teachers = db.model('Teachers', teacherSchema);
const Formats = db.model('Formats', formatSchema);
const Subjects = db.model('Subjects', subjectSchema);
const Channels = db.model('Channels', channelSchema);


export { Users, Clients, Pupils, Groups, Teachers, Formats, Subjects, Channels }
