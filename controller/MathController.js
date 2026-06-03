const BaseController = require('./BaseController');
const MathHelper = require('../utils/MathHelper');

class MathController extends BaseController {

    static showCharMatch(req, res) {
        res.render('math/char-match', {
            title: 'Character Match',
            result: null,
            input1: '',
            input2: '',
            sensitiveCase: 'sensitive',
            error: req.flash('error'),
        });
    }

    static processCharMatch(req, res) {
        const { input1, input2, sensitiveCase } = req.body;

        if (!input1 || !input2) {
            return res.render('math/char-match', {
                title: 'Character Match Tool',
                result: null,
                input1: input1 || '',
                input2: input2 || '',
                sensitiveCase: sensitiveCase || 'sensitive',
                error: 'Kedua input wajib diisi',
            });
            }

        const isSensitive = sensitiveCase === 'sensitive';

        const result = MathHelper.calculateCharMatch(input1, input2, isSensitive);

        res.render('math/char-match', {
            title: 'Character Match Tool',
            result,
            input1,
            input2,
            sensitiveCase,
            error: null,
        });
    }

}

module.exports = MathController;