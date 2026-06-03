const BaseController = require('./BaseController');

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

        const result = MathController.calculateCharMatch(input1, input2, isSensitive);

        res.render('math/char-match', {
            title: 'Character Match Tool',
            result,
            input1,
            input2,
            sensitiveCase,
            error: null,
        });
    }

    static calculateCharMatch(input1, input2, sensitiveCase = true) {
        if (!input1 || !input2) {
            return { percentage: 0, matchedChars: [] };
        }

        const str1 = sensitiveCase ? input1 : input1.toLowerCase();
        const str2 = sensitiveCase ? input2 : input2.toLowerCase();

        const totalChars = str1.length;
        const matchedChars = [];
        let matchCount = 0;

        for (let i = 0; i < str1.length; i++) {
            const char1 = str1[i];
            let found = false;

            for (let j = 0; j < str2.length; j++) {
                const char2 = str2[j];

                if (char1 === char2) {
                    if (!found) {
                        found = true;
                        matchCount++;

                        if (sensitiveCase) {
                            if (!matchedChars.includes(input1[i])) {
                                matchedChars.push(input1[i]);
                            }
                        } else {
                            if (!matchedChars.includes(input1[i].toUpperCase())) {
                                matchedChars.push(input1[i].toUpperCase());
                            }
                        }
                    }
                }
            }
        }

        const percentage = totalChars > 0 ? Math.round((matchCount / totalChars) * 100) : 0;

        return {
            percentage,
            matchedChars,
        };
    }

}

module.exports = MathController;