const { User } = require('../models');
const BaseController = require('./BaseController');

class AuthController extends BaseController {
    
    static showLoginForm(req, res) {
        res.render('auth/login', { 
            title: 'Login',
            error: req.flash('error'),
            success: req.flash('success'),
        });
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                req.flash('error', 'Username dan password wajib diisi');
                return res.redirect('/auth/login');
            }

            const user = await User.findOne({ where: { username } });

            if (!user) {
                req.flash('error', 'Username tidak ditemukan');
                return res.redirect('/auth/login');
            }

            const isValid = await user.validatePassword(password);
            if (!isValid) {
                req.flash('error', 'Password salah');
                return res.redirect('/auth/login');
            }

            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userRole = user.role;

            req.flash('success', `Selamat datang, ${user.username}!`);
            res.redirect('/dashboard');
        } catch (err) {
            this.handleError(req, res, err, 'Terjadi kesalahan server', '/auth/login');
        }
    }

    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    }

}

module.exports = AuthController;