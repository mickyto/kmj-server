import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(`mongodb://${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`);

//productSchema.set('toJSON', {getters: true});

export const Users = db.model('Users', {
    login: String,
    email: String,
    password: String,
    _id: Number
});
