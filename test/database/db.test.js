// const { expect } = require('chai');

// describe('Database', () => {
//     describe('MongoDB', () => {
//         const mongoose = require('mongoose');
//         const dbUrlDev = 'mongodb://127.0.01:27017/nvcti';
//         mongoose.connect(process.env.MONGOURL || dbUrlDev,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         }, (err) => {
//             expect(err).to
//                 .equal(null, 'An error occured in connecting with database: ' + err);
//         });
//     });

//     describe('MySql', () => {
//         it('should connect to mysql successfully', async (done) => {
//             const { user, password, name, options } = require('../config/db.config');

//             const sequelize = new Sequelize(name, user, password, options);

//             let connected = false;
//             try {
//                 sequelize.authenticate().then(() => {
//                     connected = true;
//                     expect(connected, 'Found ' + connected).to.be.true;
//                 })
//             } catch(e) {
//                 expect(e).to.be.null;
//             } finally {
//                 done();
//             }
//         });
//     });
// });
