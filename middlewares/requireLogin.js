const { AppError, handleError } = require('../helpers/error');

module.exports = (req, res, next) => {
    // Check is user is logged-in. If not, break the middlewera chain
    // and return a status of 401 (unauthorized)
    if (!req.user) {
        // console.log('middleware: You must log-in!');
        // return res.status(401).send({ status: 'error', message: 'You must log-in!' });
        return res.status(411).send(new AppError('401', 'You must log-in!'));
        // throw new ErrorHandler(401, 'You must log-in!');
    }
    // If logged-in, forward request to the next middleware or to the route handler
    next();
};
