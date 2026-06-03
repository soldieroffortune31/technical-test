const BaseController = require('./BaseController');

class DashboardController extends BaseController {
  
    static async index(req, res) {
        res.render('dashboard/index', { 
            title: 'Dashboard',
            success: req.flash('success'),
            error: req.flash('error'), 
        });
    }
}

module.exports = DashboardController;