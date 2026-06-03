class BaseController {
    handleError(req, res, err, message, redirectTo) {
        console.error(`[${this.name}] ${message}:`, err.message);
        req.flash('error', message);
        res.redirect(redirectTo);
    }
}

module.exports = BaseController;