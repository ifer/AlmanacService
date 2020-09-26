module.exports = (req, res, next) => {
    // Check is user is logged-in. If not, break the middlewera chain
    // and return a status of 401 (unauthorized)
    if (!req.user) {
        // console.log('middleware: You must log-in!');
        return res.status(401).send({ Error: 'You must log-in!' });
    }
    // If logged-in, forward request to the next middleware or to the route handler
    next();
};
