// Tests with nedb and camo

const User = require('../db/User').User;

// createCollection();
// testConnect();
testCreate();

function createCollection() {
    var Datastore = require('nedb');
    var users = new Datastore({ filename: '../db/users.db', autoload: true });
}

function testConnect() {
    const connect = require('camo').connect;
    let database;
    const uri = 'nedb://../db/users.db';
    connect(uri).then(function (db) {
        database = db;
    });
}

function testCreate() {
    const connect = require('camo').connect;

    const uri = 'nedb://../db/users';
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

    // let ifer = User.create({
    //     googleid: '7324182374612894769',
    //     displayname: 'Yannis Fertakis',
    // });
    //
    // ifer.save().then((u) => {
    //     console.log('id=' + u._id);
    // });
}
