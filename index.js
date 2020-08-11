var path = require('path');
global.appRoot = path.resolve(__dirname);

// Only for modules than run directly (e.g. for testing)
// All other modules will inherit this global variable
function getAppRoot() {
    return appRoot;
}

module.exports = {
    getAppRoot,
};
