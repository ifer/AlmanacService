var Document = require('camo').Document;

class User extends Document {
    constructor() {
        super();

        this.googleid = String;
        this.displayname = String;
    }

    static collectionName() {
        return 'users';
    }
}

module.exports = { User };
