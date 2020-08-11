// Tests with nedb and camo

const User = require('../models/User').User;

const getAppRoot = require('../index.js').getAppRoot;

const appRoot = getAppRoot();

// testCreate();
// testFindOne('7324182374612894769', 'Yannis Fertakis');
testFindOne('0987654321098765432', 'Giorgos Papageorgiou');
testFindOne('3459023850930958452', 'Maria Pentagiotissa');
// testFindById('a7kzrdZNZzzYBfGW');
// testDeleteUser('a8zqF33SyTJXvnUe');
// testFindOneAndDelete('D3WRfrVfxvJftErn');

function createCollection() {
    const connect = require('camo').connect;
    // var Datastore = require('nedb');
    // var users = new Datastore({ filename: '../db/users.db', autoload: true });
    let appdir = process.cwd();
    var uri = `nedb://${appdir}/db/collection`;
    connect(uri).then(function (db) {
        database = db;
    });
}

function testCreate() {
    const connect = require('camo').connect;

    const uri = `nedb://${appRoot}/db/users`;
    let database;
    connect(uri).then((db) => {
        let ifer = User.create({
            googleid: '7324182374612894769',
            displayname: 'Yannis Fertakis',
        });

        ifer.save().then((u) => {
            console.log('id=' + u._id);
        });
    });
}

function testFindOne(googleid, displayname) {
    const connect = require('camo').connect;

    const uri = `nedb://${appRoot}/db/users`;
    connect(uri).then((db) => {
        User.findOne({ googleid: googleid }).then((existingUser) => {
            if (!existingUser) {
                let ifer = User.create({
                    googleid: googleid,
                    displayname: displayname,
                });
                ifer.save().then((u) => {
                    console.log(`User ${u.displayname} added`);
                });
            } else {
                console.log(`User ${existingUser.displayname} already exists`);
            }
        });
    });
}

function testFindById(id) {
    const connect = require('camo').connect;

    const uri = `nedb://${appRoot}/db/users`;
    connect(uri).then((db) => {
        User.findOne({ _id: id }).then((found) => {
            if (found) {
                console.log('found: user ' + found.displayname);
            } else {
                console.log(`User with id: ${id} not found!`);
            }
        });
    });
}

function testDeleteOne(id) {
    const connect = require('camo').connect;

    const uri = `nedb://${appRoot}/db/users`;
    connect(uri).then((db) => {
        User.deleteOne({ _id: id }).then((count) => {
            if (count == 1) {
                console.log(`User deleted`);
            } else {
                console.log(`User with id: ${id} not found!`);
            }
        });
    });
}

// findOneAndDelete appears to be the same as deleteOne
function testFindOneAndDelete(id) {
    const connect = require('camo').connect;

    const uri = `nedb://${appRoot}/db/users`;
    connect(uri).then((db) => {
        User.findOneAndDelete({ _id: id }).then((count) => {
            if (count == 1) {
                console.log(`User deleted`);
            } else {
                console.log(`User with id: ${id} not found!`);
            }
        });
    });
}
