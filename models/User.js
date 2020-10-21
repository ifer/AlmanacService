var Document = require('camo').Document;

class User extends Document {
    constructor() {
        super();

        this.googleid = String;
        this.email = String;
        this.displayname = String;
        this.accessToken = String;
        this.refreshToken = String;
    }

    static collectionName() {
        return 'users';
    }
}

module.exports = { User };
