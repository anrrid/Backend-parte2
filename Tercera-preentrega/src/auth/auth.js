const auth = function (req, res, next) {
    console.log('run auth');
    if (!req.session.user) {
        console.log('error auntetication. Redirect /login')
        return res.redirect('/login')
    }
    const user = req.session.user.username;
    console.log('Happy autetication')
    console.log(`Welcome ${user}`)
    next();
}
module.exports = { auth }