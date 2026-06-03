const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    req.flash('error', 'Silakan login terlebih dahulu');
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.userRole === 'admin') {
        return next();
    }
    req.flash('error', 'Akses ditolak - hanya admin');
    res.redirect('/dashboard');
};

const isGuest = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return next();
    }
    res.redirect('/dashboard');
};

module.exports = { isAuthenticated, isAdmin, isGuest };
